import { Student } from './student.model';

const getStudentsFromDB = async () => {
  const result = await Student.find();

  return result;
};

const getStudentById = async (id: string) => {
  const result = await Student.findOne({
    id,
  });
  return result;
};

const deleteStudentById = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getStudentsFromDB,
  getStudentById,
  deleteStudentById,
};
