import {UUID} from 'angular2-uuid';
import {Base} from '../../../base';

export class Case extends Base {
  created_at:number;
  closed_at:number;
  judgementee_id:UUID;
  created_by:UUID;
  assignee_id:UUID;
  pardoned:boolean;
  judgement_session_id:UUID;
  outcome:CaseOutcome = CaseOutcome.Undecided;
  punishments:UUID[];
  description:string;
  outcome_duration:number;
  reports:UUID[];

  hasBeenAssigned() {
   return !(this.assignee_id == null || typeof this.assignee_id === 'undefined' || this.assignee_id == "00000000-0000-0000-0000-000000000000");
 }
}

export enum CaseOutcome {
  Undecided = 0,
  Muted = 1,
  Kicked = 2,
  TemporaryBan = 3,
  PermanentlyBan = 4
}
