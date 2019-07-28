import {Component, Input, OnInit} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ActivatedRoute, Router} from "@angular/router";
import {Game} from "../../models/api/game";
import {GameService} from "../game.service";
import {APIResult} from "../../models/shared/result";

declare let M: any;

@Component ({
  selector: "game-editor",
  templateUrl: "./game-editor.component.html",
  styleUrls: ["./game-editor.component.scss"],
})
export class GameEditorComponent implements OnInit {

  @Input()
  id: UUID;

  game: Game = new Game();

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.id = params["id"];
        this.getGame(params["id"]);
      }
    });
  }

  getGame(id: UUID) {
    this.gameService.get(id).subscribe(
      next => {
        this.game = next;
      },
      error => {
        console.log("Game request failed");
      },
      () => {}
    )
  }

  get gameFound() {
    return typeof this.game !== 'undefined' && typeof this.game.id !== 'undefined';
  }

  get isCreate(): boolean{
    return typeof this.id === 'undefined';
  }

  save() {
    if (this.isCreate)
      this.gameService.post(this.game).subscribe(x => {
        const result = x as APIResult;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/games/${result.generated_keys[0]}/edit`);
        } else M.toast({html: 'Something when wrong'}, 4000);
      });
    else
      this.gameService.put(this.game.id, this.game).subscribe(x => {
        const result = x as APIResult;
        if (result.replaced > 0 || result.unchanged > 0) M.toast({html: 'Saved'}, 4000);
        else M.toast({html: 'Something when wrong'}, 4000);
      });
  }
}
