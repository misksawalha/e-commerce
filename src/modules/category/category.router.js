import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "../category/category.endpoint.js";
import {myMulter,multerValidation} from '../../services/multer.js'
import * as category from './controller/category.controller.js'
const router  = Router();


router.post('/addCategory',auth(endPoint.Add),myMulter(multerValidation.image).single('image'),category.createCategory)
router.put('/updateCategory/:id',myMulter(multerValidation.image).single('image'),category.updateCategory)

export default router