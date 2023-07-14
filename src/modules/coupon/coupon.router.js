import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "../coupon/coupon.endpoint.js";
import {myMulter,multerValidation} from '../../services/multer.js'
import * as coupon from './controller/coupon.controller.js'
const router  = Router();


router.post('/createCoupon',auth(endPoint.Add),coupon.createCoupon)
router.put('/updateCoupon/:id',auth(endPoint.Update),coupon.updateCoupon)
router.delete('/deleteCoupon/:id',auth(endPoint.Delete),coupon.deleteCoupon)
router.get('/getValidCoupon',coupon.getValidCoupon)
// router.get('/getSubCategoryDetails/:id',subcategory.getSubCategoryDetails)

export default router