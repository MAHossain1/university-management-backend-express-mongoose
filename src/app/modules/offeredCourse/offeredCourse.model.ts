import { model, Schema } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';
import { Days } from './offeredCourse.constant';

const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'semesterRegistration',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academicSemester',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academicFaculty',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academicDepartment',
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'course',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'faculty',
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: {
          values: Days,
          message: `{VALUE} is not a valid day.`,
        },
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const OfferedCourse = model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
