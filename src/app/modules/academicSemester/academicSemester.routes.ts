import express from 'express';
import validateRequest from '../../config/middlewares/validateRequest';
import { AcademicSemesterValidationSchema } from './academicSemester.validation';
import { AcademicSemesterControllers } from './academicSemester.controller';
import auth from '../../config/middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidationSchema.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get(
  '/',
  auth('admin'),
  AcademicSemesterControllers.getAllAcademicSemester,
);
router.get('/:semesterId', AcademicSemesterControllers.getSemesterByID);
router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidationSchema.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
