//import asyncHandler from'express-async-handler'

//هي بالاصل بتوخد البرميتيرز يكونوا فنكشن فهون نفس الاشي اعطيتها إياه
export const asyncHandler = (fn)=>{
       
       return(req,res,next)=>{
           fn(req,res,next).catch(error=>{
              // return res.json({message:error.message,line:error.stack})
             // return res.json({message:"catch "+error})
            return next(new Error(error.message,{cause:500}))
           // return next(new Error(error.message));

           })
       }
}

