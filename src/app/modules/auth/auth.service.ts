import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  //   const isUserExists = await User.findOne({ id: payload?.id });

  // Whether the user exists or not.
  if (!(await User.isUserExistsByCustomId(payload.id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // Whether the user already deleted or not.
  if (await User.isUserDeleted(payload.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }

  // Whether the user blocked or not.
  if (await User.isUserBlocked(payload.id)) {
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

  return {};
};

export const AuthServices = {
  loginUser,
};
