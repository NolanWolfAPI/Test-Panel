import {Base} from '../../../base';
import {Vector} from "../../../shared/vector";

export class HubConfig extends Base {
  configName:string;
  rainByDefault:boolean;
  defaultTime:number;
  spawn:Vector;
  spawnWorld:string;
  spawnDirection:Vector;
  mapFile:string;
}
