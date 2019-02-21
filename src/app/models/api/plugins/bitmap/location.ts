import {Base} from '../../../base';
import {Image} from "./image";

export class Location extends Base {
  name:string;
  images:Image[];
  image_ids:string;
  worldName:string;
  vectorTopLeft:string;
  vectorBottomRight:string;
}
