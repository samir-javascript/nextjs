
import { Schema, models, Document, model } from "mongoose";
export interface IQuestion extends Document {
    title: string;
    content:string;
    tags: Schema.Types.ObjectId[];
    views: number;
    upvotes: Schema.Types.ObjectId[];
    downvotes: Schema.Types.ObjectId[];
    author: Schema.Types.ObjectId;
    answers : Schema.Types.ObjectId[];
    createdAt: Date;
}

const QuestionSchema = new Schema({
    title : {type:String, required: true},
    content : {type:String, required: true},
    tags: [{type: Schema.Types.ObjectId , ref: 'Tag'}], // tags related to this question
    views: {type: Number, default: 0},
    upvotes: [{type: Schema.Types.ObjectId , ref: 'User'}],  // the user that has liked the question
    downvotes: [{type: Schema.Types.ObjectId , ref: 'User'}], // the user that has disliked the question
    author: {type: Schema.Types.ObjectId, ref: 'User'},  // who created the question
    answers: [{type: Schema.Types.ObjectId , ref: 'Answer'}],   // the answers related to that question
    createdAt: {type: Date, default : Date.now}  // when the question got created

})
const Question = models.Question || model('Question' , QuestionSchema)
export default Question;