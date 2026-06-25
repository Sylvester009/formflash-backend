import express from 'express';
import { signUp, logIn, logOut } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { logInSchema, signUpSchema } from '../validators/authValidation.js';

const router = express.Router();

router.post('/signup', validateRequest(signUpSchema), signUp);

router.post('/login', validateRequest(logInSchema), logIn);

router.post('/logout', logOut);

export default router;
