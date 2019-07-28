import {Component, Input, OnInit} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ActivatedRoute, Router} from "@angular/router";
import {RankService} from "../rank.service";
import {Rank} from "../../models/api/plugins/moderation/rank";
import {APIResult} from "../../models/shared/result";

declare let M:any;

@Component ({
  selector: "rank-editor",
  templateUrl: "./rank-editor.component.html",
  styleUrls: ["./rank-editor.component.scss"],
})
export class RankEditorComponent implements OnInit {

  @Input()
  id: UUID = null;

  rank: Rank = new Rank();

  constructor(private rankService: RankService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] !== "undefined") {
        this.id = params["id"];
        if (this.id)
        this.getRank(this.id);
      }
    });
  }

  getRank(id: UUID) {
    this.rankService.get(id).subscribe(
      next => {
        this.rank = next;
      },
      error => {
        console.log("Rank request failed");
      },
      () => {

      }
    )
  }

  get isCreate(): boolean{
    return typeof this.rank.id == "undefined";
  }

  save() {
    if (this.isCreate)
      this.rankService.post(this.rank).subscribe(x => {
        let result = x;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/ranks/${result.generated_keys[0]}/edit`);
        } else M.toast({html: 'Something when wrong'}, 4000);
      });
    else
      this.rankService.put(this.rank.id, this.rank).subscribe(x => {
        let result = x as APIResult;
        if (result.replaced > 0 || result.unchanged > 0) M.toast({html: 'Saved'}, 4000);
        else M.toast({html: 'Something when wrong'}, 4000);
      });
  }
}
