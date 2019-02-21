import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {ActivatedRoute} from '@angular/router';
import {RankService} from '../../../services/rank.service';
import {Rank} from '../../../models/api/plugins/moderation/rank';
import {Staff} from '../../../models/core/staff';
import {Role} from '../../../models/core/role';
import {CaseService} from '../../../services/case.service';
import {PunishmentService} from '../../../services/punishment.service';
import {JudgementSessionService} from '../../../services/judgement-session.service';
import {Case, CaseOutcome} from '../../../models/api/plugins/moderation/case';
import {Punishment} from '../../../models/api/plugins/moderation/punishment';
import {JudgementSession} from '../../../models/api/plugins/moderation/judgement-session';
import {ReportService} from '../../../services/reports.service';
import {Report} from '../../../models/api/plugins/moderation/report';

import {unix} from 'moment';
import {ChatService} from "../../../services/chat.service";
import {ReducedPlayerService} from "../../../services/player.reduced.service";
import {ReducedPlayer} from "../../../models/api/reducedplayer";
import {APIResult} from "../../../models/shared/result";
import {Subject} from "rxjs";

declare let M;

@Component ({
  selector: 'case-editor',
  templateUrl: './case-editor.component.html',
  styleUrls: ['./case-editor.component.scss'],
})
export class CaseEditorComponent implements OnInit, OnDestroy {

  @Input()
  id: UUID = null;

  case: Case = new Case();
  staff: Staff[] = [];
  players: ReducedPlayer[] = [];
  punishments: Punishment[] = [];
  judgementSession: JudgementSession = new JudgementSession();
  ranks: Rank[] = [];
  role: Role = new Role();
  reports: Report[] = [];

  otherCases: Case[] = [];
  otherCasesCount: number = 0;

  chatSession: Subject<any>;

  oldOutcome: CaseOutcome;
  oldPardoned: boolean;

  outcometime = 0;
  outcometimeunit: number = this.timeunits[0].value;

  chatFullScreen:boolean = false;

  constructor(private caseService: CaseService,
              private playerService: ReducedPlayerService,
              private rankService: RankService,
              private punishmentService: PunishmentService,
              private judgementSessionService: JudgementSessionService,
              private reportService: ReportService,
              private route: ActivatedRoute,
              private chatService: ChatService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== 'undefined') {
        this.id = params['id'];
        this.getCase(params['id']);}
    });
  }

  get judgementee(): ReducedPlayer {
    return this.players.find(x => x.id == this.case.judgementee_id);
  }

  get judgementeeRank(): Rank {
    const player = this.judgementee;
    if (player == null) return new Rank();
    return this.ranks.find(x => x.id == player.rank_id);
  }

  get assignee(): ReducedPlayer {
    return this.players.find(x => x.id == this.case.assignee_id);
  }

  get assigneeRank(): Rank {
    const player = this.assignee;
    if (player == null) return new Rank();
    return this.ranks.find(x => x.id == player.rank_id);
  }

  get creator(): ReducedPlayer {
    return this.players.find(x => x.id == this.case.created_by);
  }

  get creatorRank(): Rank {
    const player = this.creator;
    if (player == null) return new Rank();
    return this.ranks.find(x => x.id == player.rank_id);
  }

  getPunishment(id: UUID): Punishment {
    return this.punishments.find(x => x.id == id);
  }

  getReport(id: UUID): Report {
    return this.reports.find(x => x.id == id);
  }

  getCase(id: UUID) {
    this.caseService.get(id).subscribe(
      next => {
        this.case = next;
        this.outcometime = this.case.outcome_duration / 3600000;
        this.oldOutcome = this.case.outcome;
        this.oldPardoned = this.case.pardoned;
      },
      error => {
        console.log('Case request failed');
      },
      () => {
        if(this.case.judgement_session_id) this.chatSession = this.chatService.getJudgementChatSession(this.case.judgement_session_id);
        this.getReports();
        this.getPunishments();
        this.getJudgementSession();
        this.getPlayers();
        this.getCases();
      }
    )
  }

  getReports() {
    this.reportService.getByIds(this.case.reports).subscribe(
      next => {
        this.reports = next;
      },
      error => {
        console.log('Reports request failed');
      },
      () => {

      }
    )
  }


  getJudgementSession() {
    if (!this.case.judgement_session_id) return;
    this.judgementSessionService.get(this.case.judgement_session_id).subscribe(
      next => {
        this.judgementSession = next;
      },
      error => {
        console.log('Judgement Session request failed');
      },
      () => {

      }
    )
  }

  getPunishments() {
    this.punishmentService.getByIds(this.case.punishments).subscribe(
      next => {
        this.punishments = next;
      },
      error => {
        console.log('Punishments request failed');
      },
      () => {

      }
    )
  }

  getRanks() {
    const ids = this.players.map(x => x.rank_id);
    this.rankService.getByIds(ids).subscribe(
      next => {
        this.ranks = next;
      },
      error => {
        console.log('Ranks request failed');
      },
      () => {

      }
    )
  }

  getPlayers() {
    const ids = [
      this.case.assignee_id,
      this.case.judgementee_id,
      this.case.created_by
    ];
    this.playerService.getByIds(ids).subscribe(
      next => {
        this.players = next;
      },
      error => {
        console.log('Player request failed');
      },
      () => {
        this.getRanks();
      }
    )
  }

  getPlayer(id: UUID) {
    return this.players.find(x => x.id == id);
  }

  getCases() {
    this.caseService.getWhereJudgementee(this.case.judgementee_id).subscribe(data => {
      this.otherCases = data.filter(x => x.id != this.id);
    });
    this.caseService.getWhereJudgementeeCount(this.case.judgementee_id).subscribe(data => {
      this.otherCasesCount = data;
    });
  }

  save() {
    this.case.outcome_duration = this.outcomeDuration;
    if (this.closed) this.case.closed_at = Date.now();
    this.caseService.put(this.case.id, this.case).subscribe(x => {
      const result = x as APIResult;
      if (result.replaced > 0) M.toast({html: 'Saved'}, 4000);
      else if (result.unchanged > 0) M.toast({html: 'No changes detected'}, 4000);
      else M.toast({html: 'Something when wrong'}, 4000);
    });
  }

  reopen(event) {
    event.preventDefault();
    this.case.closed_at = 0;
    this.case.pardoned = false;
    this.case.outcome = 0;
    this.save();
  }

  get outcomes() {
    return [
      {key: 'Undecided', value: 0},
      {key: 'Muted', value: 1},
      {key: 'Kicked', value: 2},
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
    if (this.case.closed_at && this.case.closed_at != 0) return false;
    if (this.case.pardoned) return true;
    return this.case.outcome > 0;
  }

  get status() {
    if (this.case.closed_at > 0) {
      if (this.case.pardoned) return 'PARDONED';
      else return 'CLOSED';
    } else if (this.case.assignee_id) return 'ASSIGNED';
    return 'NEW';
  }

  get saveButtonText() {
    if (this.case.closed_at > 0) return 'CLOSED';
    if (this.case.outcome > 0) return 'CLOSE';
    else return 'SAVE';
  }

  toggleChatFullscreen(event) {
    this.chatFullScreen = !this.chatFullScreen;
  }

  ngOnDestroy() {
    if(this.chatSession) this.chatSession.complete();
  }
}

