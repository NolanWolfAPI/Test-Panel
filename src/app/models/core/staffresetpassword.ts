import {UUID} from "angular2-uuid";
import {Base} from "../base";

export class StaffPasswordReset extends Base {
  oldPassword:string;
  newPassword:string;
  staff_id: UUID;
  email: string;
}
