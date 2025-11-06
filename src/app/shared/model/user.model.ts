export interface User {
  id?: string;
  name: string;
  surname?: string;
  email: string;
  password: string;
  provider?: 'email' | 'google';
  photoUrl?: string;
  emailVerified?: boolean
  createdAt?: Date;
  terms: boolean;
}

