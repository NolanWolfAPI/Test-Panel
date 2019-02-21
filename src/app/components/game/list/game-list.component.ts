import {Component, OnInit} from "@angular/core";

import {Game} from "../../../models/api/game";
import {GameService} from "../../../services/game.service";
import {UUID} from "angular2-uuid";
import {APIResult} from "../../../models/shared/result";

declare let M;

@Component ({
  selector: "game-list",
  templateUrl: "./game-list.component.html",
  styleUrls: ["./game-list.component.scss"],
})
export class GameListComponent implements OnInit {
  rows: any[] = [];

  games: Game[] = [];

  total = 100;
  pageNumber = 1;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.gameService.getAll().subscribe((results) => {
      this.games = results;
    },error => {
      console.log("Games request failed");
    },() => this.generateRows())
  }

  generateRows() {
    this.rows = this.games.map(game => ({game:game}));
    //this.loading.setSuccessful();
  }

  delete(event, id:UUID) {
    event.stopPropagation();
    if (!confirm("This will delete this item permanently. Are you sure you want to do this?")) return;
    this.gameService.delete(id).subscribe(data => {
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
