import {Component, OnInit} from "@angular/core";

import {VanityService} from "../vanity.service";
import {VanityItem} from "../../models/api/plugins/vanity/vanity-item";
import {UUID} from "angular2-uuid";
import {APIResult} from "../../models/shared/result";

declare let M:any;

@Component ({
  selector: "vanity-list",
  templateUrl: "./vanity-list.component.html",
  styleUrls: ["./vanity-list.component.scss"],
})
export class VanityListComponent implements OnInit {
  vanities: VanityItem[] = [];

  constructor(private vanityService: VanityService) {}

  ngOnInit() {
    this.getVanities();
  }

  getVanities() {
    this.vanityService.getAll().subscribe((results) => {
      this.vanities = results;
    },
      error => {
        console.log("Vanities request failed");
      })
  }

  delete(event, id:UUID) {
    event.stopPropagation();
    if (!confirm("This will delete this item permanently. Are you sure you want to do this?")) return;
    this.vanityService.delete(id).subscribe(data => {
      const results:APIResult = data ;
      if (results.deleted > 0) {
        M.toast({html: 'Deleted'}, 4000);
        this.ngOnInit();
      } else {
        M.toast({html: 'Something when wrong'}, 4000);
      }
    });
  }
}
