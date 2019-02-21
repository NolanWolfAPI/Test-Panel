import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../../../services/player.service';
import {Player} from '../../../models/api/player';
import {RankService} from '../../../services/rank.service';
import {Rank} from '../../../models/api/plugins/moderation/rank';
import {forkJoin} from "rxjs";

@Component ({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  rows: any[] = [];

  players: Player[] = [];
  ranks: Rank[] = [];

  total = 100;
  pageNumber = 1;

  searchQuery = '';

  constructor(private playerService: PlayerService,
              private rankService: RankService) {}

  ngOnInit() {
    forkJoin(
      this.searchQuery.length > 0 ? this.playerService.search(this.searchQuery, this.pageNumber) : this.playerService.getAll(this.pageNumber),
      this.rankService.getAll(),
      this.searchQuery.length > 0 ? this.playerService.getAllCount(): this.playerService.searchCount(this.searchQuery)
    ).subscribe((results) => {
      this.players = results[0];
      this.ranks = results[1];
      this.total = Number.parseInt(results[2]);
      this.generatePlayerList();
    })
  }

  search() {
    return this.playerService.search(this.searchQuery).subscribe(
      next => {
        this.players = next;
      },
      error => {
        console.log('Player search failed');
      },
      () => {
        this.pageNumber = 0;
        this.generatePlayerList()
      }
    )
  }

  generatePlayerList() {
    this.rows = this.players.map(player => {
      return {
        player: player,
        rank: this.ranks.find(x => x.id === player.rank_id)
      };
    })
  }

  pageChanged(event) {
    this.pageNumber = event;
    this.ngOnInit();
  }
}
