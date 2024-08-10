/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { sendImageToCloudinary } from '../../utils/sendImageToCludinary';

const createStudentIntoDB = async (
  file: any,
  password: string,
  studentData: TStudent,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, set default password
  userData.password = password || (config.default_password as string);

  // set user role
  userData.role = 'student';
  // set user email
  userData.email = studentData.email;

  // find academic semester info
  const academicSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  if (!academicSemester) {
    throw new AppError(400, 'Admission semester not found');
  }

  const academicDepartment = await AcademicDepartment.findById(
    studentData.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found !');
  }

  studentData.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateStudentId(academicSemester);

    // create a user first transaction
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user');
    }

    if (file) {
      const imageName = `${userData.id}_${studentData?.name?.firstName}`;
      const path = file?.path;

      const profileImg = await sendImageToCloudinary(imageName, path);

      studentData.profileImg = profileImg?.secure_url;
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
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, set default password
  userData.password = password || (config.default_faculty_password as string);

  // set user role
  userData.role = 'faculty';

  // set user email
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found!');
  }

  payload.academicFaculty = academicDepartment.academicFaculty;

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

    if (file) {
      const imageName = `${userData.id}_${payload?.name?.firstName}`;
      const path = file?.path;

      const profileImg = await sendImageToCloudinary(imageName, path);
      payload.profileImg = profileImg?.secure_url;
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

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, set default password
  userData.password = password || (config.default_faculty_password as string);

  // set user role
  userData.role = 'admin';
  // set user email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set id to user
    userData.id = await generateAdminId();

    if (file) {
      const imageName = `${userData.id}_${payload?.name?.firstName}`;
      const path = file?.path;

      const profileImg = await sendImageToCloudinary(imageName, path);
      payload.profileImg = profileImg?.secure_url;
    }

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

const getMe = async (requestUser: JwtPayload) => {
  const { userId, role } = requestUser;

  let result = null;

  if (role === 'admin') {
    result = await User.findOne({ id: userId });
  }
  if (role === 'student') {
    result = await Student.findOne({ id: userId });
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId });
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
