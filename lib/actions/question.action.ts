'use server'
import Question from "@/database/question.model";
import { connectToDatabase } from "@/lib/mongoose"
import Tag from "@/database/tag.model";
import { CreateQuestionParams, DeleteQuestionParams, EditQuestionParams, GetQuestionByIdParams, GetQuestionsParams, QuestionVoteParams, RecommendedParams, SearchParams, ToggleSaveQuestionParams, UpdateUserParams, ViewQuestionParams } from "./shared";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";
import Answer from "@/database/answer.model";
// @ts-ignore
import { FilterQuery } from "mongoose";



export async function getQuestions(params:GetQuestionsParams) {
  const { searchQuery, page = 1 , pageSize = 10 , filter} = params;
  try {
    await connectToDatabase();
    const query:FilterQuery<typeof Question> = {}
    const skipAmount = pageSize * (page - 1)
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortOptions = {}
    switch (filter) {
      case 'newest':
        sortOptions = { createdAt: -1}
        break;
        case 'frequent':
          sortOptions = { views: -1}
          break;
          case 'unanswered':
            query.answers = { $size: 0}
            break;
      default:
        break;
    }
    // Assuming Question model has fields 'tags' and 'author'
    const questions = await Question.find(query)
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .limit(pageSize)
      .skip(skipAmount)
      .sort(sortOptions)
      const totalQuestions = await Question.countDocuments(query)
    const isNext = totalQuestions > skipAmount + questions.length;
    return { questions, isNext };
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
     
      for(const tag of tags) {
         const existingTags = await Tag.findOneAndUpdate(
            {name: { $regex: new RegExp(`^${tag}$`,"i")}},
            {$setOnInsert: {name:tag}, $push: {questions: question._id}},
            {upsert: true, new : true}
         )
         tagDocuments.push(existingTags._id)
           await Question.findByIdAndUpdate(question._id , {
               $push:{tags:{$each: tagDocuments}}
            }
         )
      }
      await Interaction.create({
         action: 'ask_question',
         question: question._id,
         user: author,
         tags: tagDocuments
      })
      await User.findByIdAndUpdate(author, {$inc: {reputation: 5}})
       revalidatePath(path)
  } catch (error) {
     console.log(error)
  }
}

export async function getQuestionById(params:GetQuestionByIdParams) {
  try {
     await connectToDatabase()
     const { questionId } = params;
     const question = await Question.findById(questionId)
     .populate({path: "tags", model: Tag, select: "name _id "})
     .populate({path: "author", model: User, select: "clerkId _id picture name"})
     return question;
   // revalidatePath('/')
  } catch (error) {
    console.error('Error fetching questions from the database:', error);
    throw new Error('Failed to fetch questions from the database');
  }
}

export async function upvoteQuestion(params:QuestionVoteParams) {
  try {
    await connectToDatabase()
    const { path, hasdownVoted, hasupVoted, userId , questionId} = params;
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
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {new: true})
    if(!question) {
      throw new Error('Question not found')
    }
    await User.findByIdAndUpdate(userId, {
       $inc: { reputation: hasupVoted ? -1 : 1}
    })
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10}
   })
    revalidatePath(path)
  } catch (error) {
    console.log(error)
  }
}
export async function downvoteQuestion(params:QuestionVoteParams) {
  try {
    await connectToDatabase()
    const { path, hasdownVoted, hasupVoted, userId , questionId} = params;
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
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {new: true})
    if(!question) {
      throw new Error('Question not found')
    }
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? 1 : -1}
   })
   await User.findByIdAndUpdate(question.author, {
     $inc: { reputation: hasdownVoted ? 10 : -10}
  })
    revalidatePath(path)
  } catch (error) {
    console.log(error)
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
   await   connectToDatabase()
     const { userId, questionId, path } = params;
     const user = await User.findById(userId)
     if(!user) {
       throw new Error('User not found')
     }
     const isQuestionSaved = user.saved.includes(questionId)
     if(isQuestionSaved) {
       // remove question from saved 
         await User.findByIdAndUpdate(userId,
         {$pull: {saved: questionId}},
         {new: true})
     }else {
       // add question to saved
       await User.findByIdAndUpdate(userId,
         {$addToSet: {saved: questionId}},
         {new: true})
     }
     revalidatePath(path)
  } catch (error) {
     console.log(error)
     throw error;
  }
}

export async function viewQuestion (params:ViewQuestionParams)  {
 
  try {
    const {questionId, userId } = params;
    await  connectToDatabase()
    const questionObject = await Question.findOneAndUpdate({ _id: questionId }, { $inc: { views: 1 }});

    if(userId) {
        const existingInteraction = await Interaction.findOne({user: userId, action: "view", question:questionId})
        if(existingInteraction) return console.log('user has already viewed');
        console.log('TAGS FROM BACKEND V2', questionObject.tags)
        await Interaction.create({
             user: userId,
             action: "view",
             question: questionId,
             tags: questionObject.tags
        })

    }
  } catch (error) {
     console.log(error)
     throw error;
  }
}

export async function deleteQuestion(params:DeleteQuestionParams) {
   try {
      const { questionId, path } = params;
      await connectToDatabase()
       await Question.deleteOne({_id: questionId})
       await Answer.deleteMany({question: questionId})
       await Interaction.deleteMany({question: questionId})
       await Tag.updateMany({questions:questionId}, { $pull: {questions: questionId}})
       revalidatePath(path)
   } catch (error) {
      console.log(error)
      throw error;
   }
}

export async function editQuestion(params:EditQuestionParams) {
  const { title, content , questionId, path } = params;
  try {
     connectToDatabase()
     const question = await Question.findById(questionId).populate('tags')
     if(!question) {
      throw new Error('Question not found')
     }
     question.title = title;
     question.content = content;
     await question.save()
     revalidatePath(path)
  } catch (error) {
     console.log(error)
     throw error;
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

export async function getHotQuestions() {
   try {
     connectToDatabase()
     const questions = await Question.find({})
     .sort({views: -1, upvotes: -1})
     .limit(5)
     if(!questions) {
      throw new Error('Questions not found')
     }
     return  questions ;
   } catch (error) {
     console.log(error)
     throw error;
   }
}


const searchableTypes = ['question', 'user', 'tag', 'answer'];

export async function globalSearch(params:SearchParams) {
    try {
        await connectToDatabase();
        const { query, type } = params;
        const regExQuery = { $regex: query, $options: "i" };
        let results = [];
        const modelsAndTypes = [
            { model: Question, searchField: 'title', type: 'question' },
            { model: Answer, searchField: 'content', type: 'answer' },
            { model: Tag, searchField: 'name', type: 'tag' },
            { model: User, searchField: 'name', type: 'user' },
        ];
        const typeLower = type?.toLowerCase();

        if (!typeLower || !searchableTypes.includes(typeLower)) {
            // Search across everything
            for (const { model, searchField, type: itemType } of modelsAndTypes) {
                const queryResults = await model.find({[searchField]: regExQuery }).limit(2);
                results.push(
                    ...queryResults.map((item:any) => ({
                        title: itemType === "answer" ? `Answer containing ${query}` :
                         item[searchField],
                        type: itemType,
                        id: itemType === "user" ? item.clerkId : itemType === 'answer' ?
                         item.question : item._id,
                    }))
                );
            }
        } else {
            // Search for specified MODEL type;
            const modelInfo = modelsAndTypes.find(item => item.type === typeLower);
            if (!modelInfo) {
                throw new Error('Invalid search type');
            }
            const queryResults = await modelInfo.model.find({ [modelInfo.searchField]: regExQuery }).limit(8);
             results = queryResults.map((item:any) => ({
                title: typeLower === "answer" ? `type containing ${query}` : item[modelInfo.searchField],
                type: typeLower,
                id: typeLower === 'user' ? item.clerkId : typeLower === "answer" ? item.question : item._id,
            }));
        }
        return JSON.stringify(results);
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function getRecommendedQuestions(params:RecommendedParams) {
    try {
      await connectToDatabase()
      const { userId, page = 1 , pageSize = 10 , searchQuery} = params;
      //find user
      const user = await User.findOne({clerkId: userId})
      if(!user) {
        throw new Error('No user found')
      }
      const skipAmount = pageSize * (page - 1)
      // find user's interactions;
      const userInteractions = await Interaction.find({user: user._id})
      .populate('tags')
      .exec();
       // extract tags from user's interactions;
       const userTags = userInteractions.reduce((tags,interaction)=> {
        if(interaction.tags) {
          tags = tags.concat(interaction.tags)
        }
        return tags
       }, [])
       // get disticts tags ids from user interactions,
       const distinctUserTagIds = [
        // @ts-ignore
        ...new Set(userTags.map((tag:any)=> tag?._id)),
       ]
       const query: FilterQuery<typeof Question> = {
         $and: [
          {
            tags: {$in: distinctUserTagIds}
          },
          {
            author: { $ne: user._id }
          }
         ]
       };
       if(searchQuery) {
          query.$or = [
            { title: {$regex: searchQuery, $options: "i"}},
            { content: {$regex: searchQuery, $options: "i"}},
          ]
       }
       const totalQuestions = await Question.countDocuments(query)
       const recommendedQuestions = await Question.find(query)
       .populate({
        path: 'tags',
        model: Tag
       })
       .populate({
        path: "author",
        model: User
       })
       .skip(skipAmount)
       .limit(pageSize)
       const isNext = totalQuestions > skipAmount + recommendedQuestions.length;
       return {isNext, questions: recommendedQuestions}

    } catch (error) {
      console.log(error, "error getting recommended questions")
      throw error;
    }
}