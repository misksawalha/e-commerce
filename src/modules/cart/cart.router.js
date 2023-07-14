import { Router } from "express";
import { auth } from "../../middleware/auth.js";
 import { endPoint } from "./cart.endPoint.js";
import {myMulter,multerValidation} from '../../services/multer.js'
import * as cart from './controller/cart.controller.js'
const router  = Router();

 
router.post('/addToCart',auth(endPoint.Add),cart.addToCart)
// router.put('/updateCart/:id',myMulter(multerValidation.image).single('image'),cart.updateBrand)
// router.get('/getAllCart',brand.getAllBrand)
// router.get('/getSubCategoryDetails/:id',subcategory.getSubCategoryDetails)

export default router