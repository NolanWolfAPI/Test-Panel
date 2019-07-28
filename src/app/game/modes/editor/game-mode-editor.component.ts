import {Component, Input, OnInit} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ActivatedRoute, Router} from "@angular/router";
import {GameModeService} from "../../game-mode.service";
import {GameMode} from "../../../models/api/game-mode";
import {APIResult} from "../../../models/shared/result";

declare let M: any;

@Component ({
  selector: "game-mode-editor",
  templateUrl: "./game-mode-editor.component.html",
  styleUrls: ["./game-mode-editor.component.scss"],
})
export class GameModeEditorComponent implements OnInit {
  @Input()
  id: UUID;

  @Input()
  gameId: UUID;

  gameMode: GameMode = new GameMode();

  constructor(private gameModeService: GameModeService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.id = params["id"];
        this.getGameMode(params["id"]);
      }
      if (params["gameId"]) {
        this.gameId = params["gameId"];
      }
    });
  }

  getGameMode(id: UUID) {
    this.gameModeService.get(id).subscribe(
      next => {
        this.gameMode = next;
      },
      error => {
        console.error("Gamemode request failed");
      },
      () => {}
    )
  }

  get isCreate(): boolean {
    return typeof this.id === 'undefined';
  }

  save() {
    this.gameMode.game_id = this.gameId;
    if (this.isCreate)
      this.gameModeService.post(this.gameMode).subscribe(x => {
        const result = x as APIResult;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/games/${this.gameId}/modes/${result.generated_keys[0]}/edit`);
        } else M.toast({html: 'Something when wrong'}, 4000);
      });
    else
      this.gameModeService.put(this.gameMode.id, this.gameMode).subscribe(x => {
        const result = x as APIResult;
        if (result.replaced > 0) M.toast({html: 'Saved'}, 4000);
        else if (result.unchanged > 0) M.toast({html: 'No changes Found'}, 4000);
        else M.toast({html: 'Something when wrong'}, 4000);
      });
  }
}
