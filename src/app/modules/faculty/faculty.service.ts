/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  // const facultiesSearchableFields = [
  //   'email',
  //   'name.firstName',
  //   'presentAddress',
  // ];

  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // // retrieved data by custom searching
  // const searchQuery = Faculty.find({
  //   $or: facultiesSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, options: 'i' },
  //   })),
  // });

  // // retrieved data by filtering
  // const excludeFields = ['searchTerm', 'page', 'limit', 'sort', 'fields'];

  // excludeFields.forEach((el) => delete queryObj[el]);

  // const filterQuery = searchQuery.find(queryObj);

  // let sort = 'createdAt';

  // if (query?.sort) {
  //   sort = query?.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // // pagination implementation
  // let page = 1;
  // let limit = 0;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query?.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // fields limiting
  // let fields = '-__v';

  // if (query?.fields) {
  //   fields = (query.field as string).split(',').join(' ');
  // }

  // const fieldsQuery = await limitQuery.select(fields);

  // return fieldsQuery;

  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');

  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }

    // get user _id from deletedFaculty
    const userId = deletedFaculty.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
