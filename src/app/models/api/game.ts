import {Base} from '../base';

export class Game extends Base {
  name:string;
  filename:string;
  description:string;
  iconMap: string;
  isLive: boolean;
  isActive: boolean;
  isBeta: boolean;
}
