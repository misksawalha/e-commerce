import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "../product/product.endpoint.js";
import {myMulter,multerValidation} from '../../services/multer.js'
import * as product from './controller/product.controller.js'
import whishListRouter from '../whishList/whishList.router.js'
const router  = Router({mergeParams:true});

router.use('/:productId/whishList',whishListRouter)
router.post('/createProduct',auth(endPoint.Add),myMulter(multerValidation.image).array('image',5),product.createProduct)
router.put('/updateProduct/:id',auth(endPoint.Add),myMulter(multerValidation.image).array('image',5),product.updateProduct)
router.get('/getAllProduct',product.getAllProduct)
// router.get('/getSubCategoryDetails/:id',subcategory.getSubCategoryDetails)

export default router