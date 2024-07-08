import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentController.createStudent);

router.get('/', StudentController.getStudentsFromDB);
router.get('/:id', StudentController.getStudentById);
router.post('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
