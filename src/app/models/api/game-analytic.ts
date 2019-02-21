import {UUID} from 'angular2-uuid';
import {Base} from '../base';

export class GlobalVariable extends Base {
  game_id:UUID;
  timestamp:number;
  data:object;
}
