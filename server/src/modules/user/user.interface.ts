// server/src/modules/user/user.interface.ts
import type { HydratedDocument, Model } from 'mongoose';
import type { UserRole } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  isBlocked: boolean;
  passwordChangedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  isPasswordMatched(plainPassword: string): Promise<boolean>;
  /** true if the password changed after the token was issued (iat in seconds) */
  changedPasswordAfter(jwtIssuedAt: number): boolean;
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserModel extends Model<IUser, {}, IUserMethods> {}

/** What the API sends to the client — never includes the password hash. */
export interface PublicUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: Date;
}
