import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { AdminServices } from './admin.service';
import sendResponse from '../../utils/sendResponse';

const getAllAdmins = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AdminServices.getAllAdminFromDB(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admins retrieved successfully',
      data: result,
    });
  },
);

const getAdminByID = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await AdminServices.getAdminByID(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin retrieved successfully',
      data: result,
    });
  },
);

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getAdminByID,
  updateAdmin,
  deleteAdmin,
};
