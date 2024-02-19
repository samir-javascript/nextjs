"use server"
import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";
import User from "@/database/user.model";


export  async function createAnswer(params:CreateAnswerParams) {
    try { 
       await connectToDatabase()
      const { content,  author, path, question} = params;
      const newAnswer = await  Answer.create({
         content, author, question
      })
      const questionObject =  await Question.findByIdAndUpdate(question, {$push: {answers: newAnswer._id}});
      await Interaction.create({
         question,
         tags: questionObject.tags,
         user: author,
         answer: newAnswer._id,
         action:"answer"
      })
       await User.findByIdAndUpdate(author,  { $inc: {reputation: 10}})
      revalidatePath(path)
     
    } catch (error) {
      console.error('Error while creating an answer :', error);
      throw new Error('Error while creating an answer');
    }
  }

  export  async function getQuestionAnswers(params:GetAnswersParams) {
    try { 
       await connectToDatabase()
      const { questionId , sortBy, page = 1 , pageSize = 2} = params;
      let sortOptions = {}
      const skipAmount = pageSize * (page - 1)
      switch (sortBy) {
        case "highestupvotes":
          sortOptions = { upvotes: -1}
          break;
          case "lowestupvotes":
            sortOptions = { upvotes: 1}
            break;
            case "recent":
              sortOptions = { createdAt: -1}
              break;
              case "old":
                sortOptions = { createdAt: 1}
                break;
        default:
          break;
      }
        const answers = await Answer.find({question: questionId})
        .populate("author", '_id, name picture clerkId')
        .sort(sortOptions)
        .limit(pageSize)
        .skip(skipAmount)
        const totalAnswers = await Answer.countDocuments({question:questionId});

        const isNext = totalAnswers > skipAmount + answers.length;
        return { answers , isNext }
     
    } catch (error) {
      console.error('Error fetching answers from the database:', error);
      throw new Error('Failed to fetch answers from the database');
    }
  }

  export async function upvoteAnswer(params:AnswerVoteParams) {
    try {
      await connectToDatabase()
      const { path, hasdownVoted, hasupVoted, userId , answerId} = params;
      let updateQuery = {}
      if(hasupVoted) {
        updateQuery = { $pull: {upvotes: userId}}
      }else if(hasdownVoted) {
         updateQuery = {
          $pull: {downvotes: userId},
          $push: {upvotes: userId}
         }
      }else  {
         updateQuery = { $addToSet: {upvotes: userId}}
      }
      const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {new: true})
      if(!answer) {
        throw new Error('Answer not found')
      }
      await User.findByIdAndUpdate(userId, {$inc: { reputation: hasupVoted ? -2 : 2 }})
      await User.findByIdAndUpdate(answer.author, {$inc: { reputation: hasupVoted ? -12 : 12 }})
      revalidatePath(path)
    } catch (error) {
      console.log(error)
    }
  }
  export async function downvoteAnswer(params:AnswerVoteParams) {
    try {
      await connectToDatabase()
      const { path, hasdownVoted, hasupVoted, userId , answerId} = params;
      let updateQuery = {}
      if(hasdownVoted) {
        updateQuery = { $pull: {downvotes: userId}}
      }else if(hasupVoted) {
         updateQuery = {
          $pull: {upvotes: userId},
          $push: {downvotes: userId}
         }
      }else  {
         updateQuery = { $addToSet: {downvotes: userId}}
      }
      const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {new: true})
      if(!answer) {
        throw new Error('Answer not found')
      }
      await User.findByIdAndUpdate(userId, {$inc: { reputation: hasdownVoted ? 2 : -2 }})
      await User.findByIdAndUpdate(answer.author, {$inc: { reputation: hasdownVoted ? 12 : -12 }})
      revalidatePath(path)
    } catch (error) {
      console.log(error)
    }
  }
  export async function deleteAnswer(params:DeleteAnswerParams) {
    try {
       const { answerId , path } = params;
       await connectToDatabase()
       const answer = await Answer.findById(answerId)
       if(!answer) {
          throw new Error('Answer not found')
       }
       await Answer.deleteOne({_id: answerId})
       await Question.updateMany({_id: answer.question}, {$pull: { answers: answer._id}})
       await Interaction.deleteMany({answer: answerId})
       revalidatePath(path)

    } catch (error) {
       console.log(error)
       throw error;
    }
 }

 