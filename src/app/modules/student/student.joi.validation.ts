import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.base': 'First name should be a type of text',
    'string.empty': 'First name cannot be an empty field',
    'any.required': 'First name is required',
  }),
  middleName: Joi.string().allow('').optional(),
  lastName: Joi.string().required().messages({
    'string.base': 'Last name should be a type of text',
    'string.empty': 'Last name cannot be an empty field',
    'any.required': 'Last name is required',
  }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father name should be a type of text',
    'string.empty': 'Father name cannot be an empty field',
    'any.required': 'Father name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father occupation should be a type of text',
    'string.empty': 'Father occupation cannot be an empty field',
    'any.required': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': 'Father contact number should be a type of text',
    'string.empty': 'Father contact number cannot be an empty field',
    'any.required': 'Father contact number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.base': 'Mother name should be a type of text',
    'string.empty': 'Mother name cannot be an empty field',
    'any.required': 'Mother name is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': 'Mother contact number should be a type of text',
    'string.empty': 'Mother contact number cannot be an empty field',
    'any.required': 'Mother contact number is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother occupation should be a type of text',
    'string.empty': 'Mother occupation cannot be an empty field',
    'any.required': 'Mother occupation is required',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local guardian name should be a type of text',
    'string.empty': 'Local guardian name cannot be an empty field',
    'any.required': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.base': 'Local guardian occupation should be a type of text',
    'string.empty': 'Local guardian occupation cannot be an empty field',
    'any.required': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Local guardian contact number should be a type of text',
    'string.empty': 'Local guardian contact number cannot be an empty field',
    'any.required': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Local guardian address should be a type of text',
    'string.empty': 'Local guardian address cannot be an empty field',
    'any.required': 'Local guardian address is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID should be a type of text',
    'string.empty': 'ID cannot be an empty field',
    'any.required': 'ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'others').required().messages({
    'any.only': '{#value} is not a valid gender',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email cannot be an empty field',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact number should be a type of text',
    'string.empty': 'Contact number cannot be an empty field',
    'any.required': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency contact number should be a type of text',
    'string.empty': 'Emergency contact number cannot be an empty field',
    'any.required': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present address should be a type of text',
    'string.empty': 'Present address cannot be an empty field',
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent address should be a type of text',
    'string.empty': 'Permanent address cannot be an empty field',
    'any.required': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').required().messages({
    'any.only': '{#value} is not a valid status',
    'any.required': 'Status is required',
  }),
});

export default studentValidationSchema;
