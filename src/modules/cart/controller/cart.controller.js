
import cartModel from '../../../../DB/model/cart.model.js';
import { asyncHandler } from './../../../middleware/asyncHandler.js';

export const addToCart=asyncHandler(
    async(req,res,next)=>{
          let {_id} = req.user
          let {products} = req.body
          let findCart = await cartModel.findOne({userId:_id})
          if(!findCart){
          let createCart = await cartModel.create({userId:_id,products})
              return res.status(201).json({message:"success",createCart})
          }
          else{
            for (const product of products) {
                let match = false
                for(let i = 0 ; i<findCart.products.length;i++){
                    if(product.productId == findCart.products[i].productId){
                        findCart.products[i] = product
                        match = true
                        break
                    }
                }
                if(!match){
                    findCart.products.push(product)
                }
            }
            let updateCart = await cartModel.findOneAndUpdate({userId:_id},{products:findCart.products})
            if(!updateCart){
                return next(new Error("Fail",{cause:400}))
            }
            else{
                res.status(201).json({message:"success",updateCart})
            }
          }
        }
)