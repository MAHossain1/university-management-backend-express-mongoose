import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourseIntoDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await CourseServices.createCourseIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Course created successfully',
      data: result,
    });
  },
);

const getAllCoursesFromDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Courses retrieved successfully',
      data: result,
    });
  },
);

const getSingleCourseFromDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Course retrieved successfully',
      data: result,
    });
  },
);

const updateCourseIntoDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await CourseServices.updateCourseIntoDB(id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Course updated successfully',
      data: result,
    });
  },
);

const deleteSingleCourseFromDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await CourseServices.deleteSingleCourseFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Course deleted successfully',
      data: result,
    });
  },
);

export const CourseControllers = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteSingleCourseFromDB,
};
