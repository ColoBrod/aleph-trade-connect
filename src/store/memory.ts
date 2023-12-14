import { Filters } from "./filters/initial";

class Memory {
  public constructor() {

  }
  
  public get(path: keyof Filters) {
    const str = localStorage.getItem(path);
    if (str === null) return null;
    return JSON.parse(str);
  }

  public set(path: keyof Filters, value: any) {
    const str = JSON.stringify(value);
    localStorage.setItem(path, str);
  }

  public del(path: keyof Filters) {
    localStorage.removeItem(path);
  }
}

const memory = new Memory();

export default memory;