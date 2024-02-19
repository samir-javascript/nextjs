// @ts-ignore
import { Schema, models, Document, model } from "mongoose";
export interface IAnswer extends Document {
   
    content:string;
    author: Schema.Types.ObjectId;
    question: Schema.Types.ObjectId;
    upvotes: Schema.Types.ObjectId[];
    downvotes: Schema.Types.ObjectId[];
    createdAt: Date;
}

const AnswerSchema = new Schema({
    content : {type:String, required: true},
    upvotes: [{type: Schema.Types.ObjectId , ref: 'User', required: true}],  // the user that has liked the question
    downvotes: [{type: Schema.Types.ObjectId , ref: 'User'}], // the user that has disliked the question
    author: {type: Schema.Types.ObjectId, ref: 'User'},  // who created the question
    question: {type: Schema.Types.ObjectId , ref: 'Question', required: true},   // the answers related to that question
    createdAt: {type: Date, default : Date.now}  // when the question got created
})
const Answer = models?.Answer || model('Answer' , AnswerSchema)
export default Answer;