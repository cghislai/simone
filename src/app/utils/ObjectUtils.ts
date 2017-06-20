export class ObjectUtils {
  static deepClone(obj: any): any {
    let json = JSON.stringify(obj);
    let parsed = JSON.parse(json);
    return parsed;
  }
}
