import {Base} from '../../../base';

export class Punishment extends Base {
  offense:string;
  description:string;
  conditions:string;
  examples:string;
  repeat_actions:PunishmentAction[] = [];
}

export class PunishmentAction {
  order:number;
  //action:PunishmentActionType;
  action:number = 0;
  duration:number;
  duration_time_unit:TimeUnit;
}

export enum PunishmentActionType {
  Warn,
  Kicked,
  Mute,
  TemporaryBan,
  PermanentlyBan
}

export enum TimeUnit {
  Seconds,
  Minutes,
  Hours,
  Days,
  Weeks,
  Months,
  Years
}
