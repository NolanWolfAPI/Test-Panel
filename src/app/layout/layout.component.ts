import {Component} from "@angular/core";

@Component ({
  selector: "layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent {

  pageTitle:string = 'Dashboard';

  pagedLoaded(data) {
    this.pageTitle = data;
  }
}
