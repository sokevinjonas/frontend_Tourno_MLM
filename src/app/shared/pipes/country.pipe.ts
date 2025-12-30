import { Pipe, PipeTransform } from '@angular/core';
import { AFRICAN_COUNTRIES } from '../../core/constants/countries';

@Pipe({
  name: 'country',
  standalone: true
})
export class CountryPipe implements PipeTransform {
  transform(value: string | undefined | null, type: 'name' | 'flag' | 'full' = 'full'): string {
    if (!value) return '';

    const country = AFRICAN_COUNTRIES.find(
      c => c.code.toLowerCase() === value.toLowerCase() || 
           c.name.toLowerCase() === value.toLowerCase()
    );

    if (!country) return value;

    switch (type) {
      case 'name':
        return country.name;
      case 'flag':
        return country.flag;
      case 'full':
      default:
        return `${country.name} ${country.flag}`;
    }
  }
}
