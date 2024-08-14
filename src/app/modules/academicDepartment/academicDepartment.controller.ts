import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartmentIntoDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department created successfully',
      data: result,
    });
  },
);

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartment(
      req.query,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic faculties retrieved successfully',
      meta: result.meta,
      data: result.result,
    });
  },
);

const getDepartmentByID = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { departmentId } = req.params;

    const result =
      await AcademicDepartmentServices.getDepartmentByID(departmentId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department retrieved successfully',
      data: result,
    });
  },
);

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartment(
      departmentId,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department updated successfully.',
      data: result,
    });
  },
);

export const AcademicDepartmentControllers = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartment,
  getDepartmentByID,
  updateAcademicDepartment,
};
