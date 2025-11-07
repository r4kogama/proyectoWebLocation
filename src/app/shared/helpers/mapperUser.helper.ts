import { User } from "../model/user.model";

// Convierte el User de Firebase en User personalizado
export const mapFireBaseUserToUser = (firebaseUser: any, provider: 'email' | 'google' = 'email'): User => {
    const fullName: string = firebaseUser.displayName || '';
    const nameParts: string[] = fullName.split(' ');
    const name: string = nameParts[0] || '';
    const surname: string = nameParts.slice(1).join(' ') || '';
    return {
      id: firebaseUser.uid,
      name: name,
      surname: surname,
      email: firebaseUser.email || '',
      password: '',
      provider: provider,
      photoUrl: firebaseUser.photoURL || '',
      emailVerified: firebaseUser.emailVerified || false,
      createdAt: firebaseUser.metadata.creationTime
      ? new Date(firebaseUser.metadata.creationTime)
      : new Date(),
      terms: true
    };
}
