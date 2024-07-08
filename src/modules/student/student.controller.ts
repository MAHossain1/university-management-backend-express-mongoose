/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.joi.validation';

const getStudentsFromDB = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.getStudentById(studentId);
    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.deleteStudentById(studentId);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const StudentController = {
  getStudentsFromDB,
  getStudentById,
  deleteStudent,
};
