import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "../subcategory/subcategory.endpoint.js";
import {myMulter,multerValidation} from '../../services/multer.js'
import * as subcategory from './controller/subcategory.controller.js'
const router  = Router({mergeParams:true});

//,auth(endPoint.Add),myMulter(multerValidation.image).single('image')
router.post('/',myMulter(multerValidation.image).single('image'),subcategory.createSubCategory)
router.put('/:id',myMulter(multerValidation.image).single('image'),subcategory.updateSubCategory)
router.get('/',subcategory.getAllSubCategory)
router.get('/getSubCategoryDetails/:id',subcategory.getSubCategoryDetails)

export default router