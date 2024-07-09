import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: TAcademicSemester | null,
): Promise<string> => {
  const lastStudent = await findLastStudentId();

  const currentId = lastStudent || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  const yearString = academicSemester?.year.toString();

  incrementedId = `${yearString?.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  // console.log(incrementedId);

  return incrementedId;
};
