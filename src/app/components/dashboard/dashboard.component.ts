import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";


@Component ({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit(): void {
      const path = sessionStorage.getItem('path');
      sessionStorage.removeItem('path');

      if (path && path !== '/') {
        console.log(path)
        setTimeout(() => this.router.navigateByUrl(path));
      }
  }

}
