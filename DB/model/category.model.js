import mongoose, { Schema,Types } from "mongoose";

const categorySchema = new mongoose.Schema({
      name:{
        type:String,
        required:[true,'category name is required'],
        min :[3,'min length is 3'],
        max:[25,'max length is 25']
      },
      image:String,
      createdBy:{
        type:Types.ObjectId(),
        ref:'user',
        required:[true,'category owner is required'],
      }
},{timestamps:true})

const categoryModel = mongoose.model('category',categorySchema)

export default categoryModel