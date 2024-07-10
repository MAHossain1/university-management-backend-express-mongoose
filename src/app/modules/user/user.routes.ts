import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  // validateRequest(studentValidationSchemas.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
