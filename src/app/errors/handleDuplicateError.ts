/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const regexPattern = /dup key: { name: "(.*?)" }/;

  // Use the match method to extract the value
  const match = error.message.match(regexPattern);

  const extracted_message = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extracted_message} is already exists!`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast error.',
    errorSources,
  };
};

export default handleDuplicateError;
