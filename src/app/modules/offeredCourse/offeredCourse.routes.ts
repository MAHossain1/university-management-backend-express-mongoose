import express from 'express';
import validateRequest from '../../config/middlewares/validateRequest';
import { OfferedCourseValidationSchema } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';
import auth from '../../config/middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  OfferedCourseControllers.getAllOfferedCourses,
);
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);

router.post(
  '/create-offered-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.student),
  validateRequest(
    OfferedCourseValidationSchema.createOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(
    OfferedCourseValidationSchema.updateOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  OfferedCourseControllers.deleteOfferedCourse,
);

export const OfferedCourseRoutes = router;
