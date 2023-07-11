
import { asyncHandler } from './../../../middleware/asyncHandler.js';
import cloudinary from './../../../services/cloundinary.js';
import categoryModel from './../../../../DB/model/category.model.js';
import slugify from 'slugify';
import { pagination } from '../../../services/pagination.js';

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
         const { secure_url,public_id } = await cloudinary.uploader.upload(req.file.path, { folder: 'ecommerce/category' })
         req.body.image = secure_url
         console.log(public_id)
         req.body.imagePublicId = public_id
      }
          let {id} = req.params
          if(req.body.name){
            req.body.slug = slugify(req.body.name)
          }
          let category = await categoryModel.findByIdAndUpdate(id,req.body,{new:false})
          console.log(category.imagePublicId)
          if(req.file){
            await cloudinary.uploader.destroy(category.imagePublicId)
          }
          console.log(category)
          if(!category){
            next(new Error("fail to update category",{cause:400}))
          }
          else{
            res.status(200).json({message:"category updated successfully",category})
          }
          
   }
)

export const getAllCategory = asyncHandler(

      async (req,res,next)=>{
         let {page} = req.query
         let {skip,limit}= pagination(page)
         let category = await categoryModel.find({}).limit(limit).skip(skip).populate({
            path:"createdBy",
            select:'userName'
         }).select('name')
         if(!category){
            next(new Error("Fail",{cause:400}))
         }
         else{
            res.status(200).json({message:category})
         }
      }
)

export const getCategoryDetails = asyncHandler(
   async (req,res,next) => {
         let {id}  = req.params 
         let category = await categoryModel.findOne({_id:id})
         if(!category){
            next(new Error("fail",{cause:400}))
         }
        else{
         res.status(200).json({message:"success",category})
        }
   }
)