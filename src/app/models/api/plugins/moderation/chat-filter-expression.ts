import {UUID} from 'angular2-uuid';
import {Base} from '../../../base';

export class ChatFilterExpression extends Base {
  name:string;
  expression:string;
  user_id:UUID;
  created_on:number;
  active:boolean;
}
