import {Component, OnInit} from "@angular/core";

import {APIResult} from "../../models/shared/result";
import {UUID} from "angular2-uuid";
import {CustomApiConfig} from "../../models/core/customapiconfig";
import {CustomApiConfigService} from "../customapiconfig.service";
import {LoadingState} from "../../models/shared/loading-state";
import {forkJoin} from "rxjs";

declare let M:any;

@Component ({
  selector: "customapiconfig-list",
  templateUrl: "./customapiconfig-list.component.html",
  styleUrls: ["./customapiconfig-list.component.scss"],
})
export class CustomApiConfigListComponent implements OnInit {

  customApiConfigs:CustomApiConfig[] = [];

  loading: LoadingState = new LoadingState;

  constructor(private customApiConfigService: CustomApiConfigService) {}

  ngOnInit() {
    forkJoin(
      this.customApiConfigService.getAll()
    ).subscribe((results) => {
      this.customApiConfigs = results[0];
      this.loading.setSuccessful();
    })
  }

  // search(query:string) {
  //   this.loading.setLoading();
  //   return this.customApiConfigService.search(query).subscribe(
  //     next => {
  //       this.customApiConfigs = next;
  //       this.loading.setSuccessful()
  //     },
  //     error => {
  //       this.loading.setFailed("customApiConfigs search failed");
  //     },
  //   )
  // }

  delete(event, id:UUID) {
    event.stopPropagation();
    if (!confirm("This will delete this item permanently. Are you sure you want to do this?")) return;
    this.customApiConfigService.delete(id).subscribe(data => {
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
