import { Timestamp, FieldValue } from '@angular/fire/firestore';

export interface User {
  id?: string;
  name: string;
  surname?: string;
  email: string;
  password: string;
  confirmPassword?: string,
  provider?: 'email' | 'google';
  photoUrl?: string;
  emailVerified?: boolean;
  createdAt?: Timestamp | FieldValue; // Permitir FieldValue para serverTimestamp
  terms: boolean;
}


