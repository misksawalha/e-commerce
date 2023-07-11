
import { asyncHandler } from './../../../middleware/asyncHandler.js';

export const createCategory=asyncHandler(
       async(req,res,next)=>{
        res.json("createCategory")
       }
)