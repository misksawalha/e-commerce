import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "../category/category.endpoint.js";
import {myMulter,multerValidation} from '../../services/multer.js'
import * as category from './controller/category.controller.js'
import  subCategoryRouter  from "../subcategory/subcategory.router.js";

const router  = Router();

router.use('/:categoryId/subcategory',subCategoryRouter)
router.post('/addCategory',auth(endPoint.Add),myMulter(multerValidation.image).single('image'),category.createCategory)
router.put('/updateCategory/:id',myMulter(multerValidation.image).single('image'),category.updateCategory)
router.get('/getAllCategory',category.getAllCategory)
router.get('/getCategoryDetails/:id',category.getCategoryDetails)

export default router