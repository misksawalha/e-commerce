
import { asyncHandler } from './../../../middleware/asyncHandler.js';
import cloudinary from './../../../services/cloundinary.js';
import slugify from 'slugify';
import { pagination } from '../../../services/pagination.js';
import productModel from './../../../../DB/model/product.model.js';
import categoryModel from './../../../../DB/model/category.model.js';
import subCategoryModel from './../../../../DB/model/subcategory.model.js';
import brandModel from './../../../../DB/model/brand.model.js';

export const createProduct = asyncHandler(
   async (req, res, next) => {
          if(!req.files?.length){
             next(new Error("image is required",{cause:400}))
          }
          else{
            let {name,amount,price,discount,categoryId,subCategoryId,brandId} = req.body
            req.body.slug = slugify(name)
            req.body.stock = amount
            req.body.finalPrice = (price-(price*((discount || 0) /100)))
            let category  = await subCategoryModel.findOne({_id:subCategoryId,categoryId:categoryId})
            if(!category){
               next(new Error("Invalid category or subcategory id",{cause:404}))
            }
            let brand = await brandModel.findOne({_id:brandId})
            if(!brand){
               next(new Error("Invalid brand id",{cause:404}))
            }
            let images=[]
            let imagePublicIds = []
            for (const file of req.files) {
               let {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:`ecommerce/product/${name}`})
               images.push(secure_url)
               imagePublicIds.push(public_id)
            }
            req.body.images = images
            req.body.imagePublicIds = imagePublicIds
            req.body.createdBy = req.user._id
            const product  = await productModel.create(req.body)
            if(!product){
               next(new Error("Fail to add product"),{cause:400})
            }
            else{
              res.status(201).json({message:"Product Added",product})
            }
          }
         }
)

export const updateProduct = asyncHandler(

   async (req, res, next) => {
      
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