import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    minlength: [3, 'Minimum length is 3'],
    maxlength: [25, 'Maximum length is 25'],
    unique: [true, 'Category name must be unique']
  },
  image: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Category owner is required']
  },
  slug: String,
  imagePublicId: String,
},
 { 
  timestamps: true,
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});

categorySchema.virtual('subCategory', {
  ref: 'subCategory', //the name of it is table
  localField: '_id', //the id for category
  foreignField: 'categoryId' //
})
const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;
