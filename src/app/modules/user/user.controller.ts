import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User created successfully',
      data: result,
    });
  },
);

export const UserControllers = {
  createStudent,
};
