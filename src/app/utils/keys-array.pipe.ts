import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'keysArray',
})
export class KeysArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value== null || typeof value != 'object') {
      return [];
    }
    let keys = Reflect.ownKeys(value);
    return keys;
  }

}
