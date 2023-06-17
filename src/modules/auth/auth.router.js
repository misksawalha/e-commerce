import { Router } from "express";
import { confirmEmail, signIn, signUp } from './controller/auth.controller.js';
const router  = Router();

router.post('/signUp',signUp)
router.get('/confirmEmail:token',confirmEmail)
router.post('/signIn',signIn)
export default router