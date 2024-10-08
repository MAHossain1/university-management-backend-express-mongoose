import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const getStudentsFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getStudentsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students retrieved successfully.',
    meta: result.meta,
    data: result.result,
  });
});

const getStudentById = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.getStudentById(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is retrieved successfully.',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentById(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student deleted successfully.',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student updated successfully.',
    data: result,
  });
});

export const StudentController = {
  getStudentsFromDB,
  getStudentById,
  deleteStudent,
  updateStudent,
};
