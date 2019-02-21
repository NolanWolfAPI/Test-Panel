import {Base} from '../../../base';

export class Phrase extends Base {
  description:string;
  name:string;
  preview:string;
  translations:Map<string, string>;
}
