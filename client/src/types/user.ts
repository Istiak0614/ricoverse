// client/src/types/user.ts
// Mirrors PublicUser in docs/api-contract.md
export type UserRole = 'customer' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthPayload {
  user: User;
  accessToken: string;
}
