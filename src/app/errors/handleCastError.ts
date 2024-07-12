import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: 'Invalid id',
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast error.',
    errorSources,
  };
};

export default handleCastError;
