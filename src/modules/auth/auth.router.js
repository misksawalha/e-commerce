import { Router } from "express";
import { signUp } from './controller/auth.controller.js';
const router  = Router();

router.post('/signUp',signUp)


export default router