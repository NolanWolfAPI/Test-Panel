import {Base} from "../base";
import {TableConfig} from "./tableconfig";

export class CustomApiConfig extends Base {
  tableConfig:TableConfig = new TableConfig();
  model: Map<string,string> = new Map();
  endPoints: Map<string,string> = new Map();
}
