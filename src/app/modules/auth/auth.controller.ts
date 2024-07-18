/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import config from '../../config';

function isJwtPayload(user: any): user is JwtPayload {
  return user !== null && typeof user === 'object';
}

const loginUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AuthServices.loginUser(req.body);

    const { refreshToken, accessToken, needsPasswordChange } = result;

    res.cookie('refreshToken', refreshToken, {
      secure: config.node_env === 'production',
      httpOnly: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User logged in successfully.',
      data: {
        accessToken,
        needsPasswordChange,
      },
    });
  },
);

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  // Use the type guard function to ensure req.user is a valid JwtPayload
  if (!isJwtPayload(req.user)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
