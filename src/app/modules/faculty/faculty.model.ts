import { model, Schema } from 'mongoose';
import { FacultyModel, TFaculty, TUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    maxlength: [20, 'First name can not more than 20 character.'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    maxlength: [20, 'Last name can not more than 20 character.'],
  },
});

export const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, 'id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'userId is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: `{VALUE} is not a valid gender.`,
      },
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'email is required.'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: `{VALUE} is not a valid blood group.`,
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String, default: '' },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
