import {Base} from "../base";

export class Role extends Base {
  name:string;
  permissions: string[];
  isActive: string;
}
