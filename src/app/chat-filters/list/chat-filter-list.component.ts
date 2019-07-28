import {Component, OnInit} from "@angular/core";
import {LoadingState} from "../../models/shared/loading-state";
import {ChatFilterService} from "../chat-filter.service";
import {ChatFilterExpression} from "../../models/api/plugins/moderation/chat-filter-expression";

@Component ({
  selector: "chat-filter-list",
  templateUrl: "./chat-filter-list.component.html",
  styleUrls: ["./chat-filter-list.component.scss"],
})
export class ChatFilterListComponent implements OnInit {

  chatFilters:ChatFilterExpression[] = [];

  loading: LoadingState = new LoadingState;

  constructor(private chatFilterService: ChatFilterService) {}

  ngOnInit() {
    this.getFilters();
  }

  getFilters() {
    this.chatFilterService.getAll().subscribe(data => {
        this.chatFilters = data
        this.loading.setSuccessful();
      },
      ()=> {
        this.loading.setFailed("Something when wrong");
      },
      ()=> {
    });
  }
}
