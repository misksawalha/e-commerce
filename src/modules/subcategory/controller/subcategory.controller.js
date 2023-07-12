
import { asyncHandler } from './../../../middleware/asyncHandler.js';
import cloudinary from './../../../services/cloundinary.js';
import slugify from 'slugify';
import { pagination } from '../../../services/pagination.js';
import subCategoryModel from './../../../../DB/model/subcategory.model.js';
import categoryModel from '../../../../DB/model/category.model.js';

export const createSubCategory = asyncHandler(
   async (req, res, next) => {
      if (!req.file) {
         next(new Error("Image is required", { cause: 400 }))
      }
      else {
         let {categoryId}=req.params
         let category= await categoryModel.findById(categoryId)
         if(!category){
            next(new Error("This category id does not exist",{cause:400}))
         }
         else{
         let { name } = req.body
         let slug = slugify(name)
         const { secure_url ,public_id} = await cloudinary.uploader.upload(req.file.path, { folder: `ecommerce/category/subcategory/${categoryId}` })
         const subcategory = await subCategoryModel.create({ image: secure_url, name, slug, categoryId,createdBy:category.createdBy,imagePublicId:public_id })
         if (!subcategory) {
            next(new Error("fail to add subcategory", { cause: 400 }))
         }
         else {
            res.status(201).json({ message: "the subcategory created Successfully", subcategory })
         }
         }
         
        
      }
  }
)

export const updateSubCategory = asyncHandler(

   async (req, res, next) => {
      let {id,categoryId}=req.params
      let sub = await subCategoryModel.findById(id)
      if(!sub){
         next(new Error("fail to find subcategory",{cause:400}))
      }
      else{
      if (req.file) {
         const { secure_url,public_id } = await cloudinary.uploader.upload(req.file.path,{folder:`ecommerce/category/subcategory/${categoryId}`})
         req.body.image = secure_url
         console.log(public_id)
         req.body.imagePublicId = public_id
      }
          if(req.body.name){
            req.body.slug = slugify(req.body.name)
          }
          let subcategory = await subCategoryModel.findOneAndUpdate({_id:id,createdBy:categoryId},req.body,{new:false})
          if(subcategory){
            if(req.file){
               await cloudinary.uploader.destroy(subcategory.imagePublicId)
             }
             res.status(200).json({message:"subcategory updated successfully",subcategory})
          }
          else {
            next(new Error("fail to update subcategory",{cause:400}))
          }
   }
}
)

export const getAllSubCategory = asyncHandler(async (req, res, next) => {
   let { page } = req.query;
   let { skip, limit } = pagination(page);
   let subcategories = await subCategoryModel.find({})
     .limit(limit)
     .skip(skip)
     .populate({
       path:'createdBy',
     
     });
 
   if (!subcategories) {
     next(new Error('Fail', { cause: 400 }));
   } else {
     res.status(200).json({ message: subcategories });
   }
 });
 

export const getSubCategoryDetails = asyncHandler(
   async (req,res,next) => {
         let {id}  = req.params 
         let subcategory = await subCategoryModel.findOne({_id:id}).populate({
            path:"createdBy",
            select:'userName'
         })
         if(!subcategory){
            next(new Error("fail",{cause:400}))
         }
        else{
         res.status(200).json({message:"success",subcategory})
        }
   }
)