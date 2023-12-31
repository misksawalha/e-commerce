import mongoose, { Schema } from "mongoose";

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    minlength: [3, 'Minimum length is 3'],
    maxlength: [25, 'Maximum length is 25'],
    unique:[true,'Category name must be unique']
  },
  image: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Category owner is required']
  },
  slug:String,
  imagePublicId:String,
  categoryId:{
    type:Schema.Types.ObjectId,
    ref:'Category'
  }
}, { timestamps: true });

const subCategoryModel = mongoose.model('subCategory', subCategorySchema);

export default subCategoryModel;
