import mongoose, { Schema,Types } from "mongoose";

const orderSchema = new Schema({
  userId:{
    type:Types.ObjectId,
    ref:'user',
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
     },
     totalPrice:{
        type:Number,
        default:1
     }
   }
  ],
  address:String,
  phone:String,
  totalPrice:{
   type: Number,
   default:1
}

}, { timestamps: true });

const orderModel = mongoose.model('order', orderSchema);

export default orderModel;
