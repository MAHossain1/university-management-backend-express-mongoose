import { TEnrolledCourse } from './enrolledCourse.interface';

const createEnrolledCoursesIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  console.log(payload);
};

export const EnrolledCourseServices = {
  createEnrolledCoursesIntoDB,
};
