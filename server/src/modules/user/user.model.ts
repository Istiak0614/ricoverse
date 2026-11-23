// server/src/modules/user/user.model.ts
import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { config } from '../../config';
import { USER_ROLE, USER_ROLES } from './user.constant';
import type { IUser, IUserMethods, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // select: false → the hash is never returned unless a query asks for '+password'
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: USER_ROLES, default: USER_ROLE.customer },
    phone: { type: String, trim: true },
    avatar: { type: String },
    isBlocked: { type: Boolean, default: false },
    passwordChangedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        delete ret.password;
        delete ret.passwordChangedAt;
        return ret;
      },
    },
  },
);

// Hash the password whenever it is created or changed.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, config.bcryptSaltRounds);
  if (!this.isNew) this.passwordChangedAt = new Date(Date.now() - 1000);
});

userSchema.methods.isPasswordMatched = function (plainPassword: string) {
  return bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (jwtIssuedAt: number) {
  if (!this.passwordChangedAt) return false;
  return Math.floor(this.passwordChangedAt.getTime() / 1000) > jwtIssuedAt;
};

export const User = model<IUser, UserModel>('User', userSchema);
