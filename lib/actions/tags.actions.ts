import { connectToDatabase } from "../mongoose";
import Tag, { ITag } from "@/database/tag.model";
import User from "@/database/user.model";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared";
// @ts-ignore
import { FilterQuery } from "mongoose";
import Question from '@/database/question.model'
import Interaction from "@/database/interaction.model";

export async function getTopInteractedTags(params:GetTopInteractedTagsParams) {
  const { userId } = params;
  try {
    await connectToDatabase()
      const user = await User.findById(userId)
     if(!user)  throw new Error('user not found')
     const tags = await Interaction.findOne({user: userId})
    .populate('tags', '_id name')
    
      return  { tags }
  } catch (error) {
      console.log(error)
      throw error;
  }
}

export async function getAllTags(params:GetAllTagsParams) {
   const { searchQuery , filter , page = 1, pageSize = 12} = params;
   const skipAmount = pageSize * (page - 1)
   const query: FilterQuery<typeof Tag> = {}
   if(searchQuery) {
      query.$or = [
          { name: { $regex: new RegExp(searchQuery, "i")}},
          { description: { $regex: new RegExp(searchQuery, "i")}},
      ]
   }
   let sortOptions =  {}
   switch (filter) {
    case "popular":
      sortOptions = { questions: -1}
      break;
      case "recent":
        sortOptions = { createdAt: -1}
        break;
        case "old":
          sortOptions = { createdAt: 1}
          break;
        case "name":
          sortOptions = { name: 1}
        break;
    default:
      break;
   }
    try {
      await connectToDatabase()
        const tags = await Tag.find(query)
        .sort(sortOptions)
        .limit(pageSize)
        .skip(skipAmount)
        const totalTags = await Tag.countDocuments(query)
        const isNext = totalTags > skipAmount + tags.length;
        return { tags , isNext}
    } catch (error) {
        console.log(error)
        throw error;
    }
  }

export async function getQuestionsByTagId (params:GetQuestionsByTagIdParams) {
   try {
     const { tagId, page = 1, searchQuery, pageSize = 10} = params;
     connectToDatabase()
     const tagFilter: FilterQuery<ITag> = { _id : tagId }
     const skipAmount = pageSize * (page - 1)
     const tag = await Tag.findOne(tagFilter).populate({
       path: 'questions',
       model: Question,
       match: searchQuery ? { title: { $regex: searchQuery, $options: "i"}}: {},
       options: {
          sort: {createdAt: -1},
          limit: pageSize + 1,
          skip: skipAmount
       },
       populate: [
           {path: 'tags', model: Tag, select: '_id name'},
           {path: 'author', model: User, select: '_id clerkId picture name'}
       ]
     })
   
     if(!tag) {
         throw new Error('User not found')
     }


          const isNext = tag.questions.length > pageSize;
          const questions = tag.questions;
         
          return {questions, tagTitle: tag.name , isNext}

   } catch (error) {
      console.log(error)
   }
}

export async function getPopularTags() {
   try {
      await connectToDatabase()
      const populareTags = await Tag.aggregate([
         {$project: {name: 1, numberOfQuestions: {$size: "$questions"}}},
         { $sort:  {numberOfQuestions: -1}},
         { $limit: 5}
      ])
      return populareTags;
   } catch (error) {
     console.log(error)
     throw error;
   }
}