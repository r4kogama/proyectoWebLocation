import { User } from "../model/user.model";
import { Timestamp } from "@angular/fire/firestore";
import { User as FirebaseUser } from '@angular/fire/auth';

// Convierte el User de Firebase en User personalizado
export const mapFireBaseUserToUser = (firebaseUser: FirebaseUser, provider: 'email' | 'google' = 'email'): User => {
    const { name, surname } = splitFullName(firebaseUser.displayName ?? '');
    return {
      id: firebaseUser.uid,
      name: name,
      surname: surname,
      email: firebaseUser.email || '',
      password: '',
      provider: provider,
      photoUrl: firebaseUser.photoURL || '',
      emailVerified: firebaseUser.emailVerified || false,
      createdAt: Timestamp.fromDate(
        firebaseUser.metadata.creationTime
          ? new Date(firebaseUser.metadata.creationTime)
          : new Date()
      ),
      terms: true
    };

}

const splitFullName = (fullName: string): { name: string; surname: string } => {
  const parts = fullName.split(' ');
  return {
    name: parts[0] || '',
    surname: parts.slice(1).join(' ') || '',
  };
};

