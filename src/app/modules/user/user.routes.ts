import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../config/middlewares/validateRequest';
import { studentValidationSchemas } from '../student/student.validation';
import auth from '../../config/middlewares/auth';
import { USER_ROLE } from './user.contant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidationSchemas.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  UserControllers.createAdmin,
);

router.get('/me', auth('student', 'faculty', 'admin'), UserControllers.getMe);

export const UserRoutes = router;
