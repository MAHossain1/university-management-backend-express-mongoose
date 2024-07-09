/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.joi.validation';

const getStudentsFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getStudentsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students retrieved successfully.',
    data: result,
  });
});

const getStudentById = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const result = await StudentServices.getStudentById(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is retrieved successfully.',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const result = await StudentServices.deleteStudentById(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student deleted successfully.',
    data: result,
  });
});

export const StudentController = {
  getStudentsFromDB,
  getStudentById,
  deleteStudent,
};
