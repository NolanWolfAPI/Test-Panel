import {UUID} from 'angular2-uuid';
import {Base} from '../base';

export class GameMode extends Base {
  name:string;
  game_id:UUID;
  description:string;
  iconMap: string;
  isLive: boolean;
  isActive: boolean;
  isBeta: boolean;
  minPlayerCount: number;
  maxPlayerCount: number;
  minJoiningTeamSize: number;
  maxJoiningTeamSize: number;
}
