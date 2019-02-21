import {Component, OnInit} from '@angular/core';
import {RankService} from '../../../services/rank.service';
import {Rank} from '../../../models/api/plugins/moderation/rank';
import {UUID} from "angular2-uuid";
import {APIResult} from "../../../models/shared/result";

declare let M:any;

@Component ({
  selector: 'rank-list',
  templateUrl: './rank-list.component.html',
  styleUrls: ['./rank-list.component.scss'],
})
export class RankListComponent implements OnInit {
  ranks: Rank[] = [];

  constructor(private rankService: RankService) {}

  ngOnInit() {
    this.getRanks();
  }

  getRanks() {
    this.rankService.getAll().subscribe((results) => {
      this.ranks = results;
    },
      error => {
        console.log('Ranks request failed');
      })
  }

  delete(event, id:UUID) {
    event.stopPropagation();
    if (!confirm("This will delete this item permanently. Are you sure you want to do this?")) return;
    this.rankService.delete(id).subscribe(data => {
      const results:APIResult = data ;
      if (results.deleted > 0) {
        M.toast({html: 'Deleted'}, 4000);
        this.ngOnInit();
      } else {
        M.toast({html: 'Something when wrong'}, 4000);
      }
    });
  }
}
