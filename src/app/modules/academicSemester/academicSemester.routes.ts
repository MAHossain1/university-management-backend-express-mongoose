import express from 'express';
import validateRequest from '../../config/middlewares/validateRequest';
import { AcademicSemesterValidationSchema } from './academicSemester.validation';
import { AcademicSemesterControllers } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidationSchema.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
