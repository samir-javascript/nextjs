// @ts-ignore
import { Schema, models, Document, model } from "mongoose";
export interface IInteraction extends Document {
   user: Schema.Types.ObjectId;
   tags: Schema.Types.ObjectId[];
   action: string;
   answer: Schema.Types.ObjectId;
   question: Schema.Types.ObjectId;
   createdAt: Date;
}

const InteractionSchema = new Schema({
     user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
     },
     tags:[{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Tag'
     }],
     action: {
         type: String,
         required: true
     },
     question:{
        type: Schema.Types.ObjectId,
        ref: 'Question'
     },
     answer:{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
     },
      createdAt: {
        type: Date, default: Date.now()
      }

})
const Interaction = models?.Interaction || model('Interaction' , InteractionSchema)
export default Interaction;