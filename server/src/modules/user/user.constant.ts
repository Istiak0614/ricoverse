// server/src/modules/user/user.constant.ts
export const USER_ROLE = {
  customer: 'customer',
  admin: 'admin',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const USER_ROLES = Object.values(USER_ROLE);
