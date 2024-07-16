import express from 'express';
import validateRequest from '../../config/middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../config/middlewares/auth';

const router = express.Router();

router.post(
  '/login',
  auth(),
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
