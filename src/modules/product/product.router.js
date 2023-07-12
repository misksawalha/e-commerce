import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "../product/product.endpoint.js";
import {myMulter,multerValidation} from '../../services/multer.js'
import * as product from './controller/product.controller.js'
const router  = Router();

//,myMulter(multerValidation.image).single('image')
// router.post('/createBrand',auth(endPoint.Add),myMulter(multerValidation.image).single('image'),brand.createBrand)
// router.put('/updateBrand/:id',myMulter(multerValidation.image).single('image'),brand.updateBrand)
// router.get('/getAllBrand',brand.getAllBrand)
// router.get('/getSubCategoryDetails/:id',subcategory.getSubCategoryDetails)

export default router