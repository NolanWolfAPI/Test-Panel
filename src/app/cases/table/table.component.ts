import {Component, Input, OnChanges, OnInit} from '@angular/core';

import {LoadingState} from '../../models/shared/loading-state';
import {Case} from '../../models/api/plugins/moderation/case';
import {unix} from 'moment';
import {ReducedPlayerService} from '../../player/player.reduced.service';
import {ReducedPlayer} from '../../models/api/reducedplayer';

@Component ({
  selector: 'case-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class CaseTableComponent implements OnInit, OnChanges {
  rows: any[] = [];

  @Input() cases: Case[] = [];
  players: ReducedPlayer[] = [];

  loading: LoadingState = new LoadingState;

  showClosed = false;

  constructor(private playerService: ReducedPlayerService) {}

  ngOnInit() {
    this.loading.setLoading();
    this.getPlayers();
  }

  ngOnChanges() {
    this.loading.setLoading();
    this.getPlayers();
  }

  getPlayers() {
    const ids = [].concat(...this.cases.map(x => [x.judgementee_id, x.assignee_id]));
    this.playerService.getByIds(ids).subscribe(data => {
        this.players = data;
        this.loading.setSuccessful();
      },
      () => {
        this.loading.setFailed('Something when wrong');
      },
      () => {
        this.generateList();
      });
  }

  generateList() {
    this.rows = [];
    this.cases.forEach(cas => {
      const row: any = {};
      row.case = cas;
      if (typeof row.case !== 'undefined') {
        row.judgementee = this.players.find(x => x.id == cas.judgementee_id);
        row.assignee = this.players.find(x => x.id == cas.assignee_id);
      }
      this.rows.push(row);
    });

  }

  getOutcome(value: number) {
    return this.outcomes.find(x => x.value == value).name;
  }

  get outcomes() {
    return [
      {'name': 'Undecided', value: 0},
      {'name': 'Muted', value: 1},
      {'name': 'Kicked', value: 2},
      {'name': 'Temporary Ban', value: 3},
      {'name': 'Permanently Ban', value: 4},
      {'name': 'IP Mute (Unimplemented)', value: 5}
    ];
  }

  timeConverter(unix_timestamp: number, format: string = 'Do MMM YYYY, H:mm:ss'){
    return unix(unix_timestamp / 1000).format(format);
  }
}
