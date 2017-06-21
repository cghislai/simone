export class ObjectUtils {

  static jsonClone(obj: any): any {
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
}
