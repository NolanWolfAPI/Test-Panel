import {UUID} from 'angular2-uuid';
import {Base} from '../../../base';

export class Report extends Base {
  followup_id:UUID;
  requestee_id:UUID;
  accused_id:UUID;
  assignee_id:UUID;
  description:string;
  status:ReportStatus;
  created_at:number;
  assigned_at:number;
  solved_at:number;
  closed_at:number;
}

enum ReportStatus {
  NEW = <any>"NEW",
  OPEN = <any>"OPEN",
  PENDING = <any>"PENDING",
  SOLVED = <any>"SOLVED",
  CLOSED = <any>"CLOSED"
}
