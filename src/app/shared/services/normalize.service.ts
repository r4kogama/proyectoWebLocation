import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class NormalizeService {
  normalizeForm(user: User): User {
    return {
      ...user,
      name: this.capitalizeFirstLetter(this.normalizeTrim(user.name)),
      surname: this.capitalizeFirstLetter(this.normalizeTrim(user.surname || null)),
      email: this.normalizeEmail(user.email),
      password: this.normalizeTrim(user.password),
      //phone: user.phone ? this.normalizePhone(user.phone) : user.phone
    };
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
  private normalizeTrim(pass: string): string {
    return pass.trim();
  }

  private normalizePhone(phone?: string): string {
    return phone.trim().replace(/[^\\d+]/g, '') || null;
  }

  private capitalizeFirstLetter(value?: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
