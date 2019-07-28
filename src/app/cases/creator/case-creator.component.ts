import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';
import {Rank} from '../../models/api/plugins/moderation/rank';
import {Staff} from '../../models/core/staff';
import {Role} from '../../models/core/role';
import {CaseService} from '../case.service';
import {JudgementSessionService} from '../judgement-session.service';
import {Case} from '../../models/api/plugins/moderation/case';
import {Punishment} from '../../models/api/plugins/moderation/punishment';
import {JudgementSession} from '../../models/api/plugins/moderation/judgement-session';
import {Report} from '../../models/api/plugins/moderation/report';

import {unix} from 'moment';
import {ReducedPlayer} from "../../models/api/reducedplayer";
import {APIResult} from "../../models/shared/result";
import {OAuthService} from "angular-oauth2-oidc";

declare let M;

@Component ({
  selector: 'case-creator',
  templateUrl: './case-creator.component.html',
  styleUrls: ['./case-creator.component.scss'],
})
export class CaseCreatorComponent implements OnInit {

  @Input()
  id: UUID = null;

  case: Case = new Case();
  staff: Staff[] = [];
  players: ReducedPlayer[] = [];
  punishments: Punishment[] = [];
  ranks: Rank[] = [];
  role: Role = new Role();
  reports: Report[] = [];


  outcometime = 0;
  outcometimeunit: number = this.timeunits[0].value;

  @ViewChild('tabs', {read: ElementRef}) tabsRefernce: ElementRef;


  constructor(private caseService: CaseService,
              private judgementSessionService: JudgementSessionService,
              private router: Router,
              private authService: OAuthService) {}

  getId() {
    const claims:any = this.authService.getIdentityClaims();
    if (!claims) return null;
    return claims.user_id;
  }

  ngOnInit() {
    M.Tabs.init(this.tabsRefernce.nativeElement);
    this.case.assignee_id = this.getId();
  }

  save() {
    this.case.created_at = Date.now();
    this.case.outcome_duration = this.outcomeDuration;
    this.case.created_by = this.getId();
    this.case.closed_at = this.closed ? Date.now() : 0;

    if ([0,3,4].includes(this.case.outcome)) {
      let js = new JudgementSession();
      this.judgementSessionService.post(js).subscribe(x => {
        const result = x as APIResult;
        if (result.inserted > 0) {
          this.case.judgement_session_id = result.generated_keys[0];
          this.caseService.post(this.case).subscribe(x => {
            const caseResult = x as APIResult;
            if (caseResult.inserted > 0) {
              M.toast({html: 'Saved'}, 4000);
              this.router.navigateByUrl(`/cases/${caseResult.generated_keys[0]}/edit`);
            }
            else M.toast({html: 'Something when wrong'}, 4000);
          });
        }
        else M.toast({html: 'Something when wrong'}, 4000);
      });
    } else {
      this.caseService.post(this.case).subscribe(x => {
        const result = x as APIResult;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/cases/${result.generated_keys[0]}/edit`);
        }
        else M.toast({html: 'Something when wrong'}, 4000);
      });
    }
  }

  get outcomes() {
    return [
      {key: 'Undecided', value: 0},
      {key: 'Muted', value: 1},
      //{key: 'Kicked', value: 2},
      {key: 'Temporary Ban', value: 3},
      {key: 'Permanently Ban', value: 4},
      {key: 'Ip Mute', value: 5},
    ];
  }

  get timeunits() {
    return [
      {key: 'Hour(s)', value: 0},
      {key: 'Day(s)', value: 1},
      {key: 'Week(s)', value: 2},
      {key: 'Year(s)', value: 3}
    ];
  }

  timeConverter(unix_timestamp: number, format: string){
    if (unix_timestamp == 0) return '';
    return unix(unix_timestamp/1000).format(format);
  }

  get showDuration() {
    return this.case.outcome == 1 || this.case.outcome == 3
  }

  get outcomeDuration(): number {
    return this.outcometime * {
      0: 3600000,
      1: 86400000,
      2: 604800000,
      3: 31449600000
      }[this.outcometimeunit]
  }

  get closed(): boolean {
    if (this.case.closed_at != 0) return false;
    if (this.case.pardoned) return true;
    return this.case.outcome > 0;
  }
}

