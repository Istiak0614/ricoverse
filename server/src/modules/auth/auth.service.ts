// server/src/modules/auth/auth.service.ts
import { config } from '../../config';
import { AppError } from '../../utils/AppError';
import { createToken, verifyToken } from '../../utils/jwt';
import { USER_ROLE } from '../user/user.constant';
import type { PublicUser, UserDocument } from '../user/user.interface';
import { User } from '../user/user.model';
import type { LoginInput, RegisterInput } from './auth.validation';

const toPublicUser = (user: UserDocument): PublicUser => ({
  _id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  avatar: user.avatar,
  createdAt: user.createdAt,
});

const issueTokens = (user: UserDocument) => {
  const payload = { userId: user._id.toString(), role: user.role };
  return {
    accessToken: createToken(payload, config.jwt.accessSecret, config.jwt.accessExpiresIn),
    refreshToken: createToken(payload, config.jwt.refreshSecret, config.jwt.refreshExpiresIn),
  };
};

const register = async (payload: RegisterInput) => {
  const exists = await User.exists({ email: payload.email });
  if (exists) throw new AppError(409, 'An account with this email already exists');

  // Role is never taken from the request: everyone who signs up is a customer.
  const user = await User.create({ ...payload, role: USER_ROLE.customer });
  return { user: toPublicUser(user), ...issueTokens(user) };
};

const login = async ({ email, password }: LoginInput) => {
  const user = await User.findOne({ email }).select('+password');

  // Same message for "no user" and "wrong password" so attackers cannot discover emails.
  if (!user || !(await user.isPasswordMatched(password))) {
    throw new AppError(401, 'Incorrect email or password');
  }
  if (user.isBlocked) throw new AppError(403, 'This account has been blocked');

  return { user: toPublicUser(user), ...issueTokens(user) };
};

const refreshAccessToken = async (refreshToken: string | undefined) => {
  if (!refreshToken) throw new AppError(401, 'Session expired. Please sign in again');

  const decoded = verifyToken(refreshToken, config.jwt.refreshSecret);
  const user = await User.findById(decoded.userId).select('+passwordChangedAt');

  if (!user) throw new AppError(401, 'This account no longer exists');
  if (user.isBlocked) throw new AppError(403, 'This account has been blocked');
  if (user.changedPasswordAfter(decoded.iat)) {
    throw new AppError(401, 'Password was changed. Please sign in again');
  }

  const accessToken = createToken(
    { userId: user._id.toString(), role: user.role },
    config.jwt.accessSecret,
    config.jwt.accessExpiresIn,
  );
  return { user: toPublicUser(user), accessToken };
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  return toPublicUser(user);
};

export const AuthService = { register, login, refreshAccessToken, getMe };
