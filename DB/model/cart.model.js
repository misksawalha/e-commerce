import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  userId:{
    
  }

}, { timestamps: true });

const cartModel = mongoose.model('cart', cartSchema);

export default cartModel;
