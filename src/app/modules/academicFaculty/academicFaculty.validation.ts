import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty name must be string.',
    }),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z
    .object({
      name: z.string({
        invalid_type_error: 'Academic faculty name must be string.',
      }),
    })
    .optional(),
});

export const AcademicFacultyValidationSchema = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
