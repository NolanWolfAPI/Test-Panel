import {UUID} from 'angular2-uuid';
import {Base} from '../base';

export class ReducedPlayer extends Base {
  name:string;
  displayName:string;
  uuid: UUID;
  rank_id: UUID;

  endpoint = "reducedusers";
  multiName = "users";
  singleName = "user";
}
