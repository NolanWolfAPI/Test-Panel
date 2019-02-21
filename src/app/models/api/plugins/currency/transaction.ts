import {UUID} from 'angular2-uuid';
import {Base} from '../../../base';

export class Transaction extends Base {
  user_id: UUID;
  currency_id: UUID;
  amount:number;
  timestamp:number;
  description:string;
}
