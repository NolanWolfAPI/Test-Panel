import {Component, Input, OnChanges} from "@angular/core";
import {AuthGuard} from "../../shared/auth-guard.service";
import {IdentityService} from "../../shared/identity.service";

@Component ({
  selector: "has-permission",
  templateUrl: "./has-permission.component.html",
})
export class HasPermissionComponent implements OnChanges {

  @Input() permission:string = '';

  display = false;

  constructor(private authService:AuthGuard, private identityService: IdentityService) { }

  ngOnChanges (changes) {
    if (this.permission === changes.permission) return;
    this.identityService.checkPermission(this.permission).subscribe(data => {
      this.display = data;
    });
  }
}
