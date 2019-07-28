import {Component, Input, OnInit} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ActivatedRoute, Router} from "@angular/router";
import {APIResult} from "../../models/shared/result";
import {Role} from "app/models/core/role";
import {RoleService} from "../role.service";

declare let M:any;

@Component ({
  selector: "role-editor",
  templateUrl: "./role-editor.component.html",
  styleUrls: ["./role-editor.component.scss"],
})
export class RoleEditorComponent implements OnInit {

  @Input()
  id: UUID = null;

  role: Role = new Role();

  constructor(private roleService: RoleService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] !== "undefined") {
        this.id = params["id"];
        if (this.id)
        this.getRole(this.id);
      }
    });
  }

  getRole(id: UUID) {
    this.roleService.get(id).subscribe(
      next => {
        this.role = next;
      },
      error => {
        console.log("Role request failed");
      },
      () => {

      }
    )
  }

  get isCreate(): boolean{
    return typeof this.role.id == "undefined";
  }

  save() {
    if (this.isCreate)
      this.roleService.post(this.role).subscribe(x => {
        let result = x as APIResult;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/roles/${result.generated_keys[0]}`);
        } else M.toast({html: 'Something when wrong'}, 4000);
      });
    else
      this.roleService.put(this.role.id, this.role).subscribe(x => {
        let result = x as APIResult;
        if (result.replaced > 0 || result.unchanged > 0) M.toast({html: 'Saved'}, 4000);
        else M.toast({html: 'Something when wrong'}, 4000);
      });
  }
}
