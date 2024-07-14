/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateStudentId(academicSemester);

    // create a user first transaction
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user');
    }

    // set id, _id as user
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    // create a student transaction 2
    const newStudent = await Student.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student.');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create user/student.',
    );
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, set default password
  userData.password = password || (config.default_faculty_password as string);

  // set user role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found!');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set id to user
    userData.id = await generateFacultyId();

    // create new user first transaction
    const newUser = await User.create([userData], { session });

    // check whether create user or not
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new User.');
    }

    // set id, _id as user;
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create new faculty second transaction
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create new Faculty.',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, set default password
  userData.password = password || (config.default_faculty_password as string);

  // set user role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set id to user
    userData.id = await generateAdminId();

    // create new user first transaction
    const newUser = await User.create([userData], { session });

    // check whether create user or not
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new User.');
    }

    // set id, _id as user;
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create new faculty second transaction
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new Admin.');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
