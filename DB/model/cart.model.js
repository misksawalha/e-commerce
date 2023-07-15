import mongoose, { Schema,Types } from "mongoose";

const cartSchema = new Schema({
  userId:{
    type:Types.ObjectId,
    ref:'user',
    required:[true,'user id is required'],
    unique:[true,'only one cart']
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

const cartModel = mongoose.model('cart', cartSchema);

export default cartModel;
