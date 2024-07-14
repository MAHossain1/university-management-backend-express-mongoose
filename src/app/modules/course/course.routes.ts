import express from 'express';
import { CourseValidationSchema } from './course.validation';
import { CourseControllers } from './course.controller';
import validateRequest from '../../config/middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidationSchema.createCourseValidationSchema),
  CourseControllers.createCourseIntoDB,
);

router.get('/', CourseControllers.getAllCoursesFromDB);
router.get('/:id', CourseControllers.getSingleCourseFromDB);

router.patch(
  '/:id',
  validateRequest(CourseValidationSchema.updateCourseValidationSchema),
  CourseControllers.updateCourseIntoDB,
);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(
    CourseValidationSchema.assignFacultiesWithCourseValidationSchema,
  ),
  CourseControllers.assignFacultiesWithCourseIntoDB,
);

router.delete('/:id', CourseControllers.deleteSingleCourseFromDB);

export const CourseRoutes = router;
