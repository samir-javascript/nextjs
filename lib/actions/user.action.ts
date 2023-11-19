import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
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

export async function updateUser(params:UpdateUserParams) {
  try {
      await connectToDatabase()
      const { clerkId, path, updateData} = params;
      await User.findOneAndUpdate({clerkId}, updateData , {
        new: true
      })
      revalidatePath(path)
  } catch (error) {
     console.log(error)
     throw new Error('something went wrong while updating a user')
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