import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User as a student created successfully',
      data: result,
    });
  },
);

const createFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { password, faculty: facultyData } = req.body;

    const result = await UserServices.createFacultyIntoDB(
      password,
      facultyData,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User as a faculty created successfully',
      data: result,
    });
  },
);

const createAdmin = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { password, admin: adminData } = req.body;

    const result = await UserServices.createAdminIntoDB(
      req.file,
      password,
      adminData,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User as a admin created successfully',
      data: result,
    });
  },
);

const getMe = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const result = await UserServices.getMe(req.user!);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User data retrieved successfully.',
    data: result,
  });
});

const changeStatus = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await UserServices.changeStatus(id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User status changed successfully.',
      data: result,
    });
  },
);

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
