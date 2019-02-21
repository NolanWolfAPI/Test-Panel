import {Component, OnInit} from "@angular/core";
import {Case} from "../../../models/api/plugins/moderation/case";
import {CaseService} from "../../../services/case.service";
import {forkJoin} from "rxjs";

@Component ({
  selector: "case-list",
  templateUrl: "./case-list.component.html",
  styleUrls: ["./case-list.component.scss"],
})
export class CaseListComponent implements OnInit {
  cases:Case[] = [];

  showClosed: boolean = false;

  searchText:string = '';

  total = 100;
  pageNumber = 1;

  constructor(private caseService: CaseService) {
    this.toggle = this.toggle.bind(this);
  }

  ngOnInit() {
    this.getCases();
  }

  getCases() {
    forkJoin(
      this.showClosed ? this.caseService.getAll(this.pageNumber) : this.caseService.getActive(this.pageNumber),
      this.showClosed ? this.caseService.getAllCount() : this.caseService.getActiveCount(),
    ).subscribe(results => {
      this.cases = results[0];
      this.total = Number.parseInt(results[1]);
    });
  }

  pageChanged(event) {
    this.pageNumber = event;
    this.ngOnInit();
  }

  toggle() {
    this.pageChanged(1);
  }
}
