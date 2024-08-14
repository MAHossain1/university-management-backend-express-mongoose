import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result =
      await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body,
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Semester registration created successfully',
      data: result,
    });
  },
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result =
      await SemesterRegistrationServices.getAllSemesterRegistrations(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Semester registrations retrieved successfully',
      meta: result.meta,
      data: result.result,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationServices.getSingleSemesterRegistration(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'SingleSemesterRegistration retrieved successfully',
      data: result,
    });
  },
);

const updateSemesterRegistrationIntoDB = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'SingleSemesterRegistration updated successfully',
      data: result,
    });
  },
);

const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is updated successfully',
      data: result,
    });
  },
);

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistration,
};
