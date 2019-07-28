import {Component, OnInit} from "@angular/core";
import {LoadingState} from "../../models/shared/loading-state";
import {Role} from "../../models/core/role";
import {RoleService} from "../role.service";
import {APIResult} from "../../models/shared/result";
import {UUID} from "angular2-uuid";
import {forkJoin} from "rxjs";

declare let M:any;

@Component ({
  selector: "role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.scss"],
})
export class RoleListComponent implements OnInit {

  roles:Role[] = [];

  loading: LoadingState = new LoadingState;

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    forkJoin(
      this.roleService.getAll()
    ).subscribe((results) => {
      this.roles = results[0];
      this.loading.setSuccessful();
    })
  }

  search(query:string) {
    this.loading.setLoading();
    return this.roleService.search(query).subscribe(
      next => {
        this.roles = next;
        this.loading.setSuccessful()
      },
      error => {
        this.loading.setFailed("Roles search failed");
      },
    )
  }

  delete(event, id:UUID) {
    event.stopPropagation();
    if (!confirm("This will delete this item permanently. Are you sure you want to do this?")) return;
    this.roleService.delete(id).subscribe(data => {
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
