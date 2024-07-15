import express from 'express';
import { SemesterRegistrationValidationSchema } from './semesterRegistration.validation';
import validateRequest from '../../config/middlewares/validateRequest';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidationSchema.createSemesterRegistrationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
