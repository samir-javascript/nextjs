'use server'
import Question from "@/database/question.model";
import { connectToDatabase } from "@/lib/mongoose"
import Tag from "@/database/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";


export async function getQuestions(params:GetQuestionsParams) {
  try {
    await connectToDatabase();

    // Assuming Question model has fields 'tags' and 'author'
    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({createdAt: -1 })

    return { questions };
   // revalidatePath('/')
  } catch (error) {
    console.error('Error fetching questions from the database:', error);
    throw new Error('Failed to fetch questions from the database');
  }
}

export async function createQuestion(params:CreateQuestionParams) {
  try {
   await  connectToDatabase()
     const { title, content, author, tags, path} = params;
     // create question documentin database;
     const question = await Question.create({
       title, 
       content,
       author,
       path
     })
       // one question can have multiple tags and one tag can belong to multiple questions 
       // this is many to many relationship
     const tagDocuments = []
       // create the tags or get them if they already exist;
      for(const tag of tags) {
         const existingTags = await Tag.findOneAndUpdate(
            {name: { $regex: new RegExp(`^${tag}$`,"i")}},
            {$setOnInsert: {name:tag}, $push: {question: question._id}},
            {upsert: true, new : true}
         )
         tagDocuments.push(existingTags._id)
         await Question.findByIdAndUpdate(question._id , {
               $push:{tags:{$each: tagDocuments}}
            }
         )
      }
       revalidatePath(path)
  } catch (error) {
     console.log(error)
  }
}