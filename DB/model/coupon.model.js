import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
  name: {
    type: String,
    required: [true, 'coupon name is required'],
    minlength: [3, 'Minimum length is 3'],
    maxlength: [25, 'Maximum length is 25'],
    unique:[true,'coupon name must be unique']
  },
 
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'coupon owner is required']
  },
  usedBy:[{
    type:Schema.Types.ObjectId,
    ref:'user'
  }],
  expireDate:Date,
  amount:{
    type:Number,
    max:[100,"max is 100%"],
    min:[1,"min is 1%"]
  },
  

}, { timestamps: true });

const couponModel = mongoose.model('coupon', couponSchema);

export default couponModel;
