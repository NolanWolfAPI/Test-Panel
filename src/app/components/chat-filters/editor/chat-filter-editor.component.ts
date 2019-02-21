import {Component, Input, OnInit} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ActivatedRoute, Router} from "@angular/router";
import {APIResult} from "../../../models/shared/result";
import {ChatFilterExpression} from "../../../models/api/plugins/moderation/chat-filter-expression";
import {ChatFilterService} from "../../../services/chat-filter.service";

declare let M:any;

@Component ({
  selector: "chat-filter-editor",
  templateUrl: "./chat-filter-editor.component.html",
  styleUrls: ["./chat-filter-editor.component.scss"],
})
export class ChatFilterEditorComponent implements OnInit {

  @Input()
  id: UUID = null;

  chatFilter: ChatFilterExpression = new ChatFilterExpression();


  constructor(private chatFilterService: ChatFilterService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] !== "undefined") {
        this.id = params["id"];
        if (this.id)
        this.getFilter(this.id);
      }
    });
  }

  getFilter(id: UUID) {
    this.chatFilterService.get(id).subscribe(
      next => {
        this.chatFilter = next;
      },
      error => {
        console.log("Chat Filter request failed");
      },
      () => {

      }
    )
  }

  get isCreate(): boolean{
    return typeof this.chatFilter.id == "undefined";
  }

  save() {
    if (this.isCreate)
      this.chatFilterService.post(this.chatFilter).subscribe(x => {
        let result = x;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/chatfilters`);
        } else M.toast({html: 'Something when wrong'}, 4000);

      });
    else
      this.chatFilterService.put(this.chatFilter.id, this.chatFilter).subscribe(x => {
        let result = x as APIResult;
        if (result.replaced > 0 || result.unchanged > 0) M.toast({html: 'Saved'}, 4000);
        else M.toast({html: 'Something when wrong'}, 4000);
      });
  }
}
