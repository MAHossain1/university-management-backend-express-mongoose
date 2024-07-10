import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFacultyIntoDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty created successfully',
      data: result,
    });
  },
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AcademicFacultyServices.getAllAcademicFaculty();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic faculties retrieved successfully',
      data: result,
    });
  },
);

const getFacultyByID = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { facultyId } = req.params;

    const result = await AcademicFacultyServices.getFacultyByID(facultyId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic faculty retrieved successfully',
      data: result,
    });
  },
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFaculty(
      facultyId,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty updated successfully.',
      data: result,
    });
  },
);

export const AcademicFacultyControllers = {
  createAcademicFacultyIntoDB,
  getAllAcademicFaculty,
  getFacultyByID,
  updateAcademicFaculty,
};
