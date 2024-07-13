import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AcademicSemesterServices.createAcademicSemester(
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester created successfully',
      data: result,
    });
  },
);

const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AcademicSemesterServices.getAllAcademicSemester(
      req.query,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semesters retrieved successfully',
      data: result,
    });
  },
);

const getSemesterByID = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { semesterId } = req.params;

    const result = await AcademicSemesterServices.getSemesterByID(semesterId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester retrieved successfully',
      data: result,
    });
  },
);

const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemester(
      semesterId,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester updated successfully.',
      data: result,
    });
  },
);

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSemesterByID,
  updateAcademicSemester,
};
