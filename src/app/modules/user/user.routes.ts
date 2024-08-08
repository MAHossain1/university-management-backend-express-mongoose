import express from 'express';
import auth from '../../config/middlewares/auth';
import { parseJSONData } from '../../config/middlewares/parseJSONData';
import validateRequest from '../../config/middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCludinary';
import { AdminValidations } from '../admin/admin.validation';
import { studentValidationSchemas } from '../student/student.validation';
import { USER_ROLE } from './user.contant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  parseJSONData,
  validateRequest(studentValidationSchemas.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  upload.single('file'),
  parseJSONData,
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  upload.single('file'),
  parseJSONData,
  // auth(USER_ROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.userStatusValidationSchema),
  UserControllers.changeStatus,
);

router.get('/me', auth('student', 'faculty', 'admin'), UserControllers.getMe);

export const UserRoutes = router;
