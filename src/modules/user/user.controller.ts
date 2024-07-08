import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error,
    });
  }
};

export const UserControllers = {
  createStudent,
};
