import { z } from 'zod';
import { UserStatus } from './user.contant';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be string.' })
    .max(20, { message: 'Password should be within 20 character.' })
    .optional(),
});

const userStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  userStatusValidationSchema,
};
