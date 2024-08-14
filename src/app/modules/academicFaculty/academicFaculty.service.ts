import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFaculty = async (query: Record<string, unknown>) => {
  const academicFacultySearchableField = ['name'];

  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(academicFacultySearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicFacultyQuery.modelQuery;

  const meta = await academicFacultyQuery.countTotal();

  return { meta, result };
};

const getFacultyByID = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFaculty,
  getFacultyByID,
  updateAcademicFaculty,
};
