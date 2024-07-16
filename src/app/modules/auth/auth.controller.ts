import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AuthServices.loginUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User logged in successfully.',
      data: result,
    });
  },
);

export const AuthControllers = {
  loginUser,
};
