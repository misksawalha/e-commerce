import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "../category/category.endpoint.js";
import * as category from './controller/category.controller.js'
const router  = Router();


router.post('/',auth(endPoint.Add),category.createCategory)

export default router