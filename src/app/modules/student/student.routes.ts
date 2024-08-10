import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../config/middlewares/validateRequest';
import { studentValidationSchemas } from './student.validation';
import auth from '../../config/middlewares/auth';
import { USER_ROLE } from '../user/user.contant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.getStudentsFromDB,
);
router.patch(
  '/:studentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(studentValidationSchemas.updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.get(
  '/:studentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.getStudentById,
);

router.delete(
  '/:studentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.deleteStudent,
);

export const StudentRoutes = router;
