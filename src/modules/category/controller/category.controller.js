
import { asyncHandler } from './../../../middleware/asyncHandler.js';
import cloudinary from './../../../services/cloundinary.js';
import categoryModel from './../../../../DB/model/category.model.js';

export const createCategory=asyncHandler(
       async(req,res,next)=>{
        if(!req.file){
              next(new Error("Image is required",{cause:400}))
        }
        else{
              let {name} = req.body
           const {secure_url}=   await cloudinary.uploader.upload(req.file.path,{folder:'ecommerce/category'})
           const category = await categoryModel.create({image:secure_url,name,createdBy:req.user._id})
           if(!category){
              next(new Error("fail to add category",{cause:400}))
           }
           else{
              res.status(201).json({message:"the category created Successfully",category})
           }
        }
       }
)