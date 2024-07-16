import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);

  // Whether the user exists or not.
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // Whether the user already deleted or not.
  //   if (await User.isUserDeleted(payload.id)) {
  //     throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  //   }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }

  // Whether the user blocked or not.
  //   if (await User.isUserBlocked(payload.id)) {
  //     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  //   }

  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  // const isPasswordMatched = await bcrypt.compare(
  //   payload?.password,
  //   isUserExists?.password,
  // );
  // Whether the given password is correct or not.
  if (!(await User.isPasswordMatch(payload.id, payload.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match!');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: '365d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
