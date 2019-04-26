import {UUID} from 'angular2-uuid';
import {Base} from '../../../base';

export class Friend extends Base {
  sender:UUID;
  receiver:UUID;
  accepted:boolean;
  accepted_at:number;
}
