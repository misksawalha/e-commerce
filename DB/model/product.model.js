import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'product name is required'],
    minlength: [3, 'Minimum length is 3'],
    maxlength: [25, 'Maximum length is 25'],
    unique: [true, 'product name must be unique'],
    trim: true
  },
  slug: String,
  description: String,
  images: [String],
  imagePublicIds: [String],
  amount: {
    type: Number,
    default: 0
  },
  soldItems: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  finalPrice: {
    type: Number,
    default: 0
  },
  colors: [String],
  size: {
    type: [String],
    enum: ['s', 'm', 'l', 'xl']
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'subCategory',
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: 'brand',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, { timestamps: true });

const productModel = mongoose.model('product', productSchema);

export default productModel;
