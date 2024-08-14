import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { OfferedCourseServices } from './offeredCourse.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createOfferedCourse = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await OfferedCourseServices.createOfferedCourse(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Offered Course created successfully',
      data: result,
    });
  },
);

const getAllOfferedCourses = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await OfferedCourseServices.getAllOfferedCourseFromDB(
      req.query,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Offered Courses retrieved successfully',
      meta: result.meta,
      data: result.result,
    });
  },
);

const getMyOfferedCourses = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user!;
    const result = await OfferedCourseServices.getMyOfferedCoursesFromDB(
      userId,
      req.query,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'MY Offered Courses retrieved successfully',
      data: result,
    });
  },
);

const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Single OfferedCourse retrieved successfully',
      data: result,
    });
  },
);

const updateOfferedCourse = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
      id,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Offered course updated successfully',
      data: result,
    });
  },
);

const deleteOfferedCourse = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Offered course deleted successfully',
      data: result,
    });
  },
);

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getMyOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
