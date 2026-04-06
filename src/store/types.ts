export type UserRole = 'admin' | 'user';

export type Profile = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
