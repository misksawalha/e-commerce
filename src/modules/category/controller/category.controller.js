
import { asyncHandler } from './../../../middleware/asyncHandler.js';
import cloudinary from './../../../services/cloundinary.js';
import categoryModel from './../../../../DB/model/category.model.js';
import slugify from 'slugify';

export const createCategory = asyncHandler(
   async (req, res, next) => {
      if (!req.file) {
         next(new Error("Image is required", { cause: 400 }))
      }
      else {
         let { name } = req.body
         let slug = slugify(name)
         const { secure_url ,public_id} = await cloudinary.uploader.upload(req.file.path, { folder: 'ecommerce/category' })
         const category = await categoryModel.create({ image: secure_url, name, slug, createdBy: req.user._id,imagePublicId:public_id })
         if (!category) {
            next(new Error("fail to add category", { cause: 400 }))
         }
         else {
            res.status(201).json({ message: "the category created Successfully", category })
         }
      }
   }
)

export const updateCategory = asyncHandler(

   async (req, res, next) => {
      if (req.file) {
         const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: 'ecommerce/category' })
         req.body.image = secure_url
      }
          let {id} = req.params
          if(req.body.name){
            req.body.slug = slugify(req.body.name)
          }
          let category = await categoryModel.findByIdAndUpdate(id,req.body,{new:true})
          console.log(category)
          if(!category){
            next(new Error("fail to update category",{cause:400}))
          }
          else{
            res.status(200).json({message:"category updated successfully",category})
          }
          
   }
)