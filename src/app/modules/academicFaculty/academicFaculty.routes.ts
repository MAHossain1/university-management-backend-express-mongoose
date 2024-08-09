import express from 'express';
import validateRequest from '../../config/middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidationSchema } from './academicFaculty.validation';
import auth from '../../config/middlewares/auth';
import { USER_ROLE } from '../user/user.contant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidationSchema.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFacultyIntoDB,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);
router.get('/:facultyId', AcademicFacultyControllers.getFacultyByID);
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidationSchema.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
