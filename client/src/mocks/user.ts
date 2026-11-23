// client/src/mocks/user.ts
// Shaped exactly like PublicUser in docs/api-contract.md
import type { User } from '@/types/user';

export const mockUser: User = {
  _id: '673a1f0c2b9e4a0012345678',
  name: 'Tajrin Ahmed',
  email: 'tajrin@example.com',
  role: 'customer',
  phone: '01712345678',
  createdAt: '2026-11-16T10:00:00.000Z',
};
