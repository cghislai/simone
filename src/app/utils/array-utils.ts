import {isEmpty} from 'rxjs/operator/isEmpty';

export class ArrayUtils {

  static arrayContentDiffer(array1: any[], array2: any[], comparator?: (a, b) => boolean) {
    if (this.isEmpty(array1) != this.isEmpty( array2)) {
      return true;
    }
    if (this.isEmpty(array1)) {
      return false;
    }
    if (array1.length != array2.length) {
      return true;
    }
    let comp = comparator == null ? (a, b) => a == b : comparator;
    let values1NotFoundIn2 = array1.filter(value1 => {
      return array2.find(value2 => comp(value1, value2)) == null;
    });
    if (values1NotFoundIn2.length > 0) {
      return true;
    }
    let values2NotFoundIn1 = array2.filter(value2 => {
      return array1.find(value1 => comp(value1, value2)) == null;
    });
    return values2NotFoundIn1.length > 0;
  }

  static isEmpty(array: any[]) {
    if (array == null) {
      return true;
    }
    return array.length === 0;
  }
}
