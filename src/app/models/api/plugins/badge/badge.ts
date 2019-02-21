import {Base} from '../../../base';

export class Badge extends Base {
  name:string;
  progressLimit:number;
  description:string;
  givesBackgroundArt:boolean;
  parentPlugin:string;
  isLimited:boolean;
}
