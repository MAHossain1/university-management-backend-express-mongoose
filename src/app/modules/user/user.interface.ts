import { Model } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'faculty' | 'student';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isUserDeleted(id: string): Promise<boolean>;
  isUserBlocked(id: string): Promise<boolean>;
  isPasswordMatch(id: string, password: string): Promise<boolean>;
}
