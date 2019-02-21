import {UUID} from 'angular2-uuid';
import {Base} from '../../../base';

export class JudgementSession extends Base {
  created_at:number;
  ended_on:number;
  judgementee:UUID;
  judgementers:Map<UUID, string>;
  logs:Log[];
}

export class Log {
  timestamp:number;
  user_id:UUID;
  message:string;
}
