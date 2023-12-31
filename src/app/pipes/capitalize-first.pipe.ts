import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    if (value === null || value === undefined) return '';
    if (typeof (value) === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    } return value;
  }
}
