import {Component, Input, OnInit} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ActivatedRoute} from "@angular/router";
import {ReportService} from "../reports.service";
import {Report} from "../../models/api/plugins/moderation/report";

@Component ({
  selector: "report-details",
  templateUrl: "./report-details.component.html",
  styleUrls: ["./report-details.component.scss"],
})
export class ReportDetailsComponent implements OnInit {

  @Input()
  id: UUID = null;

  report: Report = new Report();

  constructor(private reportService: ReportService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] !== "undefined") {
        this.id = params["id"];
        this.getReport(params["id"]);
      }
    });
  }

  getReport(id: UUID) {
    this.reportService.get(id).subscribe(
      next => {
        this.report = next;
      },
      error => {
        console.log("Report request failed");
      },
      () => {}
    )
  }
}
