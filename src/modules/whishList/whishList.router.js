import { Router } from "express";
const router  = Router({mergeParams:true});
import { endPoint } from "../whishList/whishList.endpoint.js";
import { auth } from "../../middleware/auth.js";
import * as whishList from './controller/whishList.controller.js'

router.patch('/',auth(endPoint.Add),whishList.add)
router.delete('/',auth(endPoint.Delete),whishList.remove)
export default router
