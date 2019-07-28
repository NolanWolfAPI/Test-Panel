import {Component, Input, OnInit} from "@angular/core";

import {GameModeService} from "../../game-mode.service";
import {GameMode} from "../../../models/api/game-mode";
import {UUID} from "angular2-uuid";
import {ActivatedRoute} from "@angular/router";
import {APIResult} from "../../../models/shared/result";

declare let M;

@Component ({
  selector: "game-mode-list",
  templateUrl: "./game-mode-list.component.html",
  styleUrls: ["./game-mode-list.component.scss"],
})
export class GameModeListComponent implements OnInit {

  @Input() id: UUID;

  gameModes: GameMode[] = [];

  constructor(private route: ActivatedRoute, private gameModeService: GameModeService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (typeof params !== "undefined" && typeof params["id"] !== "undefined") {
        this.id = params["id"];
        this.getGameModesByGame();
      } else {
        this.getGameModes();
      }
    });

  }

  getGameModes() {
    this.gameModeService.getAll().subscribe((results) => {
      this.gameModes = results;
    },error => {
      console.log("Game Mode request failed");
    })
  }

  getGameModesByGame() {
    this.gameModeService.getByGameId(this.id).subscribe((results) => {
      this.gameModes = results;
    },error => {
      console.log("Game Mode By Game request failed");
    })
  }

  delete(event, id:UUID) {
    event.stopPropagation();
    if (!confirm("This will delete this item permanently. Are you sure you want to do this?")) return;
    this.gameModeService.delete(id).subscribe(data => {
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
