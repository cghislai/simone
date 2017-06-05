export class ArrayUtils {
  static arrayContentDiffer(array1: any[], array2: any[]) {
    let values1NotFoundIn2 = array1.filter(value1 => {
      return array2.find(value2 => value2 == value1) == null;
    });
    if (values1NotFoundIn2.length > 0) {
      return true;
    }
    let values2NotFoundIn1 = array2.filter(value2 => {
      return array1.find(value1 => value1 == value2) == null;
    });
    return values2NotFoundIn1.length > 0;
  }
}
