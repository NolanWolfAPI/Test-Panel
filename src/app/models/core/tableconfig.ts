export class TableConfig {
  shards:number = 1;
  replicas:number = 3;
  name: string;
  indexes: string[] = [];
  primaryKey: string = "id";
}
