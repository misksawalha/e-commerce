import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { roles } from "../../services/roles.js";
import { endPoint } from "./user.endpoint.js";
const router  = Router();


router.get('/',auth(endPoint.profile),(req,res)=>{
    res.status(200).json({message:"user module"})
})

export default router