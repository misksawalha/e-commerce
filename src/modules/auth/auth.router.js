import { Router } from "express";
import { confirmEmail, signIn, signUp } from './controller/auth.controller.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { validation } from '../../middleware/validation.js';
import { signUpValid } from "./auth.validation.js";
const router  = Router();

//router.post('/signUp',validation(signUpValid),signUp)
router.post('/signUp',signUp)
router.get('/confirmEmail:token',confirmEmail)
router.post('/signIn',asyncHandler(signIn))
export default router