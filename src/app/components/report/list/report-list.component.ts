import {Component, OnInit} from "@angular/core";
import {ReportService} from "../../../services/reports.service";
import {Report} from "../../../models/api/plugins/moderation/report";

@Component ({
  selector: "report-list",
  templateUrl: "./report-list.component.html",
  styleUrls: ["./report-list.component.scss"],
})
export class ReportListComponent implements OnInit {
  reports: Report[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.reportService.getAll().subscribe((results) => {
      this.reports = results;
    },
      error => {
        console.log("Report request failed");
      })
  }
}
