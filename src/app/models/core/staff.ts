import {UUID} from "angular2-uuid";
import {Base} from "../base";

export class Staff extends Base {
  givenNames:string;
  familyName:string;
  user_id: UUID;
  email: string;
  password: string;
  salt: string;
  isActive: string;
  role_id: UUID;
}
