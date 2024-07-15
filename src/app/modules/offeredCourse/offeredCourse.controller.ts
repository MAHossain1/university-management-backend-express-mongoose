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

//   const getAllSemesterRegistrations = catchAsync(
//     async (req: Request, res: Response): Promise<void> => {
//       const result =
//         await SemesterRegistrationServices.getAllSemesterRegistrations(req.query);

//       sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.OK,
//         message: 'Semester registrations retrieved successfully',
//         data: result,
//       });
//     },
//   );

//   const getSingleSemesterRegistration = catchAsync(
//     async (req: Request, res: Response): Promise<void> => {
//       const { id } = req.params;
//       const result =
//         await SemesterRegistrationServices.getSingleSemesterRegistration(id);

//       sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.OK,
//         message: 'SingleSemesterRegistration retrieved successfully',
//         data: result,
//       });
//     },
//   );

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

export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
};
