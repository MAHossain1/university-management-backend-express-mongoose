import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// pre save middleware/hook will work when creating user
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id });
};

userSchema.statics.isUserDeleted = async function (id: string) {
  const user = await this.findOne({ id });
  return user ? user.isDeleted : false;
};

userSchema.statics.isUserBlocked = async function (id: string) {
  const user = await this.findOne({ id });
  return user ? user.status === 'blocked' : false;
};

userSchema.statics.isPasswordMatch = async function (
  id: string,
  password: string,
) {
  const user = await this.findOne({ id });

  return bcrypt.compare(password, user?.password as string);
};

export const User = model<TUser, UserModel>('User', userSchema);
