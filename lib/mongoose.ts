// @ts-ignore
import mongoose from 'mongoose'
let isConnected: boolean = false
export const connectToDatabase = async ()=> {
   mongoose.set('strictQuery', true)
   if(!process.env.NEXT_PUBLIC_MONGOOSE_API_KEY) {
     return console.log('missing mongo db api secret key')

   }
   if(isConnected) {
      return console.log('mongo db is already connected')
   }
   try {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGOOSE_API_KEY, {
         dbName: 'developers-app',
      })
       isConnected = true
   } catch (error) {
       console.log(error)
   }

   return console.log('mongoose is connected successefly')

}