export class Helper {
   /**
   * A type-safe version of Object.keys()
   * @param obj The object to extract keys from
   * @returns An array of keys typed as keyof T
   */
  static getObjectKeys<T extends object>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
  }
}