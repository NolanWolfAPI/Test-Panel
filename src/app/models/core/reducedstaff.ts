import {UUID} from "angular2-uuid";
import {Base} from "../base";

export class ReducedStaff extends Base {
  user_id: UUID;
  password: string;
  salt: string;
  isActive: string;
  role_id: UUID;
}
