import Question from "@/database/question.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetSavedQuestionsParams, GetUserByIdParams, GetUserStatsParams, UpdateUserParams } from "./shared";
//import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";
// @ts-ignore
import { FilterQuery } from "mongoose";
//import mongoose from 'mongoose'
import Answer from "@/database/answer.model";



export async function getUserById(params:any){
   try {
      await connectToDatabase()
        const { userId } = params;
        const user = await User.findOne({clerkId: userId}) 
        if(!user) {
          return console.log('no user found')
        }
        return user;
   } catch (error) {
     console.log(error)
     throw error;
   }
}



export async function getAllUsers(params:GetAllUsersParams) {
   const { page = 1, pageSize = 10, searchQuery , filter} = params;
   
   const query:FilterQuery<typeof User> = {}
   const skipAmount = pageSize * (page - 1)
   if(searchQuery) {
       query.$or = [
          { name: { $regex: new RegExp(searchQuery , "i")}},
          { username: { $regex: new RegExp(searchQuery , "i")}}
       ]
   }
   let sortOptions = {}
   switch (filter) {
     case 'new_users':
       sortOptions = { joinedAt: -1}
       break;
       case 'old_users':
         sortOptions = {joinedAt: 1}
         break;
         case 'top_contributers':
           sortOptions = { reputation: -1}
           break;
     default:
       break;
   }
  try {
   await connectToDatabase()
    const users = await User.find(query)
    .sort(sortOptions)
    .limit(pageSize)
    .skip(skipAmount)
    const totalUsers = await User.countDocuments(query)
    const isNext = totalUsers > skipAmount + users.length;
     if(users) {
        return  {users, isNext};
     }
    
  } catch (error) {
     console.log(error)
     throw error;
  }
     
}
export async function createUser(userData:CreateUserParams) {
    try {
        await connectToDatabase()
        const newUser = await User.create(userData)
        return newUser;
    } catch (error) {
       console.log(error)
       throw new Error('something went wrong while creating a user')
    }
}



export async function deleteUser(params:DeleteUserParams) {
   
  try {
      await connectToDatabase()
      const {clerkId} = params;
       const user = await User.findOneAndDelete({clerkId})
       if(!user) {
          throw new Error('user not found')
       }
       const userQuestionsIds = await Question.find({author: user._id})
       .distinct('_id')
       await Question.deleteMany({author: user._id})
       const deletedUser = await User.findByIdAndDelete(user._id)
       return deletedUser
       // TODO : delete user answers , comment ect
  } catch (error) {
     console.log(error)
     throw new Error('user not found')
  }
}

export async function getSavedQuestions(params:GetSavedQuestionsParams) {
   
   try {
       await connectToDatabase()
       const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;
       const skipAmount = pageSize * (page - 1)
       const query:FilterQuery<typeof Question> = {}
       if (searchQuery) {
         query.$or = [
           { title: { $regex: new RegExp(searchQuery, "i") } },
           { content: { $regex: new RegExp(searchQuery, "i") } },
         ];
       }
       let sortOptions = {}
   switch (filter) {
     case 'most_recent':
       sortOptions = { createdAt: -1}
       break;
       case 'oldest':
         sortOptions = { createdAt: 1}
         break;
         case 'most_voted':
           sortOptions = { upvotes: -1}
           break;
         case 'most_viewed':
           sortOptions = { views: -1}
         break;
         case 'most_answered':
            query.answers = { $size: 1}
          break;
     default:
       break;
   }
       const user = await User.findOne({clerkId}).populate({
         path: 'saved',
         match: query,
         options: {
            sort: sortOptions,
            skip: skipAmount,
            limit: pageSize + 1
         },
         populate: [
             {path: 'tags', model: Tag, select: '_id name'},
             {path: 'author', model: User, select: '_id clerkId picture name'}
         ]
       })
     
       if(!user) {
           throw new Error('User not found')
       }
            const isNext = user.saved.length > pageSize;
            const savedQuestions = user.saved;
            
            return {questions: savedQuestions, isNext}
   } catch (error) {
      console.log(error)
     
   }
 }

 export async function getUserInfo(params:GetUserByIdParams) {
   
   try {
      const { userId } = params;
       await connectToDatabase()
       const user = await User.findOne({clerkId: userId})
       if(!user) {
          throw new Error('User not found')
       }
       const totalQuestions = await Question.countDocuments({author: user._id})
       const totalAnswers = await Answer.countDocuments({author: user._id})
       return  {
         user,
         totalAnswers,
         totalQuestions
       }
        
   } catch (error) {
      console.log(error)
      throw error;
   }
 }

 export async function getUserQuestions(params:GetUserStatsParams) {
    try {
      const { userId, page = 1 , pageSize = 10 } = params;
      connectToDatabase()
      const skipAmount = pageSize * (page - 1)
      const totalQuestions = await Question.countDocuments({author: userId})
      const questions = await Question.find({author: userId})
      .sort( { views: -1, upvotes: -1})
      .limit(pageSize)
      .skip(skipAmount)
      .populate({path: 'author', model: User, select: '_id clerkId name picture'})
      .populate({path: 'tags', model: Tag, select: '_id name'})
       
      if(!questions)  {
         throw new Error('No question found')
      }
      const isNext = totalQuestions > skipAmount + questions.length;
      return  { questions , totalQuestions , isNext}
    } catch (error) {
       console.log(error)
       throw error;
    }
 }
 

 export async function getUserAnswers(params: GetUserStatsParams) {
   try {
     const { userId, page = 1, pageSize = 10} = params;
 
    await connectToDatabase(); 
     const skipAmount = pageSize * (page - 1)
     const totalAnswers = await Answer.countDocuments({ author: userId });
     const answers = await Answer.find({ author: userId })
     .sort({ upvotes: -1 })
     .populate({
       path: 'author',
       model: User,
       select: '_id clerkId name picture',
     })
     .populate('question', '_id title')
     .limit(pageSize)
     .skip(skipAmount);
   
    
   
   if (!answers) {
     throw new Error('No answers found');
   }
   const isNext = totalAnswers > skipAmount + answers.length;
   
   
   return { answers, totalAnswers , isNext};
   } catch (error) {
     console.error(error); // Log the error for debugging
     throw error;
   }
 }