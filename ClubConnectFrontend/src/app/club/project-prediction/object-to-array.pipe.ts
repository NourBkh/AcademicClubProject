import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {
  transform(value: any): { key: string, value: any }[] {
    if (!value) return [];
    return Object.entries(value).map(([key, value]) => ({ key, value }));
  }
}
