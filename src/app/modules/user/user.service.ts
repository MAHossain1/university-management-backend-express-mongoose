import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, set default password
  userData.password = password || (config.default_password as string);

  // set user role
  userData.role = 'student';

  // find academic semester info
  const academicSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  userData.id = await generateStudentId(academicSemester);

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    studentData.id = userData.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }

  return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};
