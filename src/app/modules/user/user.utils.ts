import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (
  academicSemester: TAcademicSemester | null,
): Promise<string> => {
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();

  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentSemesterCode = academicSemester?.code;
  const currentYear = academicSemester?.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');

  incrementedId = `${academicSemester?.year}${
    academicSemester?.code
  }${incrementedId}`;

  return incrementedId;
};
