import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../config/middlewares/validateRequest';
import { studentValidationSchemas } from './student.validation';

const router = express.Router();

// router.post('/create-student', StudentController.createStudent);

router.get('/', StudentController.getStudentsFromDB);
router.patch(
  '/:studentId',
  validateRequest(studentValidationSchemas.updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.get('/:studentId', StudentController.getStudentById);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
