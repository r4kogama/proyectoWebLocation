import { Pipe, PipeTransform } from '@angular/core';
import { Args } from '../types/global.types';

@Pipe({
  name: 'formNormalize'
})

export class FormNormalizePipe implements PipeTransform {

  transform<T>(value: T, ...args: Args<string>): any {
      if (value == null) return value;
      const [option]: Args<string> = args;
      switch (option) {
        case 'lowercase':
          return value.toString().toLowerCase();
        case 'trim':
          return value.toString().trim();
        case 'lowerCaseTrim':
          return value.toString().toLowerCase().trim();
        case 'capitalize':
          return value.toString().charAt(0).toUpperCase() + value.toString().slice(1).toLowerCase().trim();
        default:
          return value;
      }
  }




}
