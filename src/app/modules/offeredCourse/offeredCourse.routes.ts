import express from 'express';
import validateRequest from '../../config/middlewares/validateRequest';
import { OfferedCourseValidationSchema } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(
    OfferedCourseValidationSchema.createOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(
    OfferedCourseValidationSchema.updateOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.updateOfferedCourse,
);

export const OfferedCourseRoutes = router;
