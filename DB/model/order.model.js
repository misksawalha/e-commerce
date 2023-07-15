import mongoose, { Schema,Types } from "mongoose";

const orderSchema = new Schema({
  userId:{
    type:Types.ObjectId,
    ref:'user',
    required:[true,'user id is required']
  },
  products:[
   {
     productId:{
        type:Types.ObjectId,
        ref:"product"
     },
     quantity:{
        type:Number,
        default:1
        
     }
   }
  ]

}, { timestamps: true });

const orderModel = mongoose.model('order', orderSchema);

export default orderModel;
