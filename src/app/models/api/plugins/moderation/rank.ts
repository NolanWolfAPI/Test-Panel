import {UUID} from 'angular2-uuid';
import {Base} from '../../../base';

export class Rank extends Base {
  name:string;
  prefix:string;
  suffix:string;
  parent_id:UUID;
  isPriority:boolean;
  permissions:string[];
}
