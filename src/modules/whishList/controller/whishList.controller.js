
import userModel from '../../../../DB/model/user.model.js';
import { asyncHandler } from './../../../middleware/asyncHandler.js';


export const add = asyncHandler(
    async(req,res,next)=>{
          let {productId} = req.params
          let addToWhishList = await userModel.findByIdAndUpdate(req.user._id,{
            $addToSet:{whishList:productId}
          })
          if(!addToWhishList){
            next(new Error("Fail",{cause:400}))
          }
          else{
            res.status(200).json({message:"success"})
          }
    }
)
export const remove = asyncHandler(
    async(req,res,next)=>{
          let {productId} = req.params
          let removeFromWhishList = await userModel.findByIdAndUpdate(req.user._id,{
            $pull:{whishList:productId}
          })
          if(!removeFromWhishList){
            next(new Error("Fail",{cause:400}))
          }
          else{
            res.status(200).json({message:"success"})
          }
    }
)