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

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
