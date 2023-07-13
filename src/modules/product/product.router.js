import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "../product/product.endpoint.js";
import {myMulter,multerValidation} from '../../services/multer.js'
import * as product from './controller/product.controller.js'
const router  = Router();

//,myMulter(multerValidation.image).single('image')
router.post('/createProduct',auth(endPoint.Add),myMulter(multerValidation.image).array('image',5),product.createProduct)
router.put('/updateProduct/:id',auth(endPoint.Add),myMulter(multerValidation.image).array('image',5),product.updateProduct)
router.get('/getAllProduct',product.getAllProduct)
// router.get('/getSubCategoryDetails/:id',subcategory.getSubCategoryDetails)

export default router