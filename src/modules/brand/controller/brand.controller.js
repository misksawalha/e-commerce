
import { asyncHandler } from './../../../middleware/asyncHandler.js';
import cloudinary from './../../../services/cloundinary.js';
import slugify from 'slugify';
import { pagination } from '../../../services/pagination.js';
import brandModel from './../../../../DB/model/brand.model.js';

export const createBrand = asyncHandler(
   async (req, res, next) => {
      if (!req.file) {
         next(new Error("Image is required", { cause: 400 }))
      }
     
         let { name } = req.body
         let slug = slugify(name)
         const { secure_url ,public_id} = await cloudinary.uploader.upload(req.file.path, { folder: `ecommerce/brand` })
         const brand = await brandModel.create({ image: secure_url, name, slug,createdBy:req.user._id,imagePublicId:public_id })
         if (!brand) {
            next(new Error("fail to add brand", { cause: 400 }))
         }
         else {
            res.status(201).json({ message: "the brand created Successfully", brand })
         }
         }
)

export const updateBrand = asyncHandler(

   async (req, res, next) => {
      let {id}=req.params
      let brand = await brandModel.findById(id)
      if(!brand){
         next(new Error("fail to find brand",{cause:400}))
      }
      else{
      if (req.file) {
         const { secure_url,public_id } = await cloudinary.uploader.upload(req.file.path,{folder:`ecommerce/brand`})
         req.body.image = secure_url
         console.log(public_id)
         req.body.imagePublicId = public_id
      }
          if(req.body.name){
            req.body.slug = slugify(req.body.name)
          }
          let findBrand = await brandModel.findOneAndUpdate({_id:id},req.body,{new:false})
          if(findBrand){
            if(req.file){
               await cloudinary.uploader.destroy(findBrand.imagePublicId)
             }
             res.status(200).json({message:"brand updated successfully",findBrand})
          }
          else {
            next(new Error("fail to update brand",{cause:400}))
          }
   }
}
)

// export const getAllSubCategory = asyncHandler(async (req, res, next) => {
//    let { page } = req.query;
//    let { skip, limit } = pagination(page);
//    let subcategories = await subCategoryModel.find({})
//      .limit(limit)
//      .skip(skip)
//      .populate({
//        path:'createdBy',
     
//      });
 
//    if (!subcategories) {
//      next(new Error('Fail', { cause: 400 }));
//    } else {
//      res.status(200).json({ message: subcategories });
//    }
//  });
 

// export const getSubCategoryDetails = asyncHandler(
//    async (req,res,next) => {
//          let {id}  = req.params 
//          let subcategory = await subCategoryModel.findOne({_id:id}).populate({
//             path:"createdBy",
//             select:'userName'
//          })
//          if(!subcategory){
//             next(new Error("fail",{cause:400}))
//          }
//         else{
//          res.status(200).json({message:"success",subcategory})
//         }
//    }
// )