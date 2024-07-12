import express from 'express';
import validateRequest from '../../config/middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidationSchema } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidationSchema.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentControllers.createAcademicDepartmentIntoDB,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);
router.get('/:departmentId', AcademicDepartmentControllers.getDepartmentByID);
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidationSchema.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
