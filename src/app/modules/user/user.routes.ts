import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../config/middlewares/validateRequest';
import { studentValidationSchemas } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidationSchemas.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',

  UserControllers.createFaculty,
);

export const UserRoutes = router;
