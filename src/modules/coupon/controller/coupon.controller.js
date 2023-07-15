import { asyncHandler } from './../../../middleware/asyncHandler.js';
import cloudinary from './../../../services/cloundinary.js';
import slugify from 'slugify';
import { pagination } from '../../../services/pagination.js';
import couponModel from './../../../../DB/model/coupon.model.js';
import moment from 'moment';

export const createCoupon = asyncHandler(
   async (req, res, next) => {
        let findCoupon = await couponModel.findOne({name:req.body.name})
        if(findCoupon){
         return  next (new Error ("coupon name already exist",{cause:409}))
        }else{
            req.body.createdBy = req.user._id
            let coupon = await couponModel.create(req.body)
            if(!coupon){
               return next(new Error("fail to create coupon",{cause:400}))
            }
            else{
               return res.status(201).json({message:"success",coupon})
            }
        }
   }
)

export const updateCoupon = asyncHandler(

   async (req, res, next) => {
      let {id}=req.params
      let updateCoupon = await couponModel.findOneAndUpdate({_id:id},req.body,{new:true})
      if(updateCoupon){
       return  res.status(200).json({message:"coupon updated successfully",updateCoupon})
      }
      else {
         return next(new Error("coupon not found",{cause:404}))
      }
   }
)

export const deleteCoupon = asyncHandler(
   async (req,res,next)=>{
       let {id} = req.params
       let deleteCoupon = await couponModel.findOneAndDelete({_id:id})
      if(updateCoupon){
       return  res.status(200).json({message:"coupon deleted successfully",deleteCoupon})
      }
      else {
         return next(new Error("coupon not found",{cause:404}))
      }
   }
)

export const getValidCoupon =asyncHandler(
   async (req,res,next)=>{
         var now = moment() //return the current date and hour
         let date= []
         let coupons = await couponModel.find({});
         for (const coupon of coupons) {
            let exp = coupon.expireDate
            let diff = now.diff(exp,"days")
            if(diff<0){
               date.push(coupon)
            }
         }
         return res.status(200).json({message:"success",date})
    }
)
// export const getAllBrand = asyncHandler(async (req, res, next) => {
//    let { page } = req.query;
//    let { skip, limit } = pagination(page);
//    let brand = await brandModel.find({})
//      .limit(limit)
//      .skip(skip)
//      .populate({
//        path:'createdBy',
     
//      });
 
//    if (!brand) {
//      next(new Error('Fail', { cause: 400 }));
//    } else {
//      res.status(200).json({ message: brand });
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