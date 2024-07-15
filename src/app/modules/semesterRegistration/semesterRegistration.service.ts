import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check whether the semester exists or not
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found!',
    );
  }

  // check the semester already registered or not
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Semester Registration already registered!',
    );
  }

  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistrations = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};

const getSingleSemesterRegistration = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationIntoDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistrationIntoDB,
};
