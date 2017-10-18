export class ObjectUtils {

  static jsonClone(obj: any): any {
    if (obj == null) {
      return null;
    }
    let json = JSON.stringify(obj);
    let parsed = JSON.parse(json);
    return parsed;
  }

  /**
   * [key:string]:string dict to `${key}=${value}` string array
   * @param dict
   */
  static dictToArray(dict: any): string[] {
    if (dict == null) {
      return [];
    }
    let keys = Reflect.ownKeys(dict);
    return keys.map(key => {
      let value = dict[key];
      if (value == null || value.length === 0) {
        return `${key}`;
      } else {
        return `${key}=${value}`
      }
    });
  }

  static dictToLinesString(dict: any): string {
    return ObjectUtils.dictToArray(dict)
      .reduce((cur, next) => cur == null ? next : cur + '\n' + next, null);
  }

  /**
   *  `${key}=${value}` string array to [key:string]:string dict
   * @param dict
   */
  static arrayToDict(array: string[]): any {
    let dict = {};
    array.forEach(label => {
      let splitted = label.split('=');
      let key = splitted[0];
      let value = splitted.length > 1 ? splitted[1] : '';
      dict[key] = value;
    });
    return dict;
  }

  static stringLinesToDict(value: string): any {
    let lines = value.split('\n');
    return ObjectUtils.arrayToDict(lines);
  }

  static applyValue(obj: any, field: string, value: any): any {
    let clone = ObjectUtils.jsonClone(obj);
    clone[field] = value;
    return clone;
  }

  static valuesDiffer(val1: any, val2: any): boolean {
    if (val1 === val2 || val1 == val2) {
      return false;
    }
    let type1 = typeof val1;
    if (type1 != typeof val2) {
      return true;
    }
    let json1 = JSON.stringify(val1);
    let json2 = JSON.stringify(val2);
    return json1 !== json2;
  }
}
