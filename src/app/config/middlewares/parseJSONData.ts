import { NextFunction, Request, Response } from 'express';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const parseJSONData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body && typeof req.body.data === 'string') {
      req.body = JSON.parse(req.body.data);
    }
    next();
  } catch (error) {
    throw new AppError(httpStatus.CONFLICT, 'Parsing error');
  }
};
