import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department name must be string.',
      required_error: 'Name is required.',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty must be string',
      required_error: 'Required.',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          invalid_type_error: 'Academic Department name must be string.',
        })
        .optional(),
      academicFaculty: z
        .string({
          invalid_type_error: 'Academic faculty must be string',
          required_error: 'Required.',
        })
        .optional(),
    })
    .optional(),
});

export const AcademicDepartmentValidationSchema = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
