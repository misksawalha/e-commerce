import { Router } from "express";
import { confirmEmail, signUp } from './controller/auth.controller.js';
const router  = Router();

router.post('/signUp',signUp)
router.get('/confirmEmail:token',confirmEmail)

export default router