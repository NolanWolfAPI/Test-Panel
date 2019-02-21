import {UUID} from "angular2-uuid";

export class APIResult {
  generated_keys: UUID[] = null;
  inserted:number = 0;
  replaced:number = 0;
  unchanged:number = 1;
  errors:number = 0;
  first_error: any;

  deleted:number = 0;
  skipped:number = 0;
  warnings: any;
  changes: any;
  ready: any;

  dbs_created:number = 0;
  dbs_dropped:number = 0;

  tables_created:number = 0;
  tables_dropped:number = 0;
}


