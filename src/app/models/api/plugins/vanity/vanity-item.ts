import {Base} from '../../../base';
import {ItemInformation} from "./item-information";
import {UUID} from "angular2-uuid";

export class VanityItem extends Base {
  name:string = '';
  category:string = 'Hat';
  consumable:boolean = false;
  price:number = 0;
  currency:UUID;
  slot:string = '0';
  type:number = 0;
  itemInformation:Map<string, ItemInformation> = new Map();
}
