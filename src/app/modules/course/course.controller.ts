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
      meta: result.meta,
      data: result.result,
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

const assignFacultiesWithCourseIntoDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
      courseId,
      faculties,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculties successfully enrolled into course.',
      data: result,
    });
  },
);

const getFacultiesWithCourse = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const result = await CourseServices.getFacultiesWithCourseFromDB(courseId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculties successfully retrieved with assigned course.',
      data: result,
    });
  },
);

const removeFacultiesFromCourse = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.removeFacultiesFromCourse(
      courseId,
      faculties,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculties successfully removed into course.',
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
  assignFacultiesWithCourseIntoDB,
  getFacultiesWithCourse,
  removeFacultiesFromCourse,
};
