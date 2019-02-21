import {Component, Input, OnInit} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ActivatedRoute, Router} from "@angular/router";
import {StaffPasswordReset} from "../../../models/core/staffresetpassword";
import {ReducedStaffService} from "../../../services/staff.reduced.service";
import {ReducedStaff} from "../../../models/core/reducedstaff";

declare let M:any;

@Component ({
  selector: "reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {

  @Input()
  id: UUID = null;

  staff: ReducedStaff = new ReducedStaff();

  model: StaffPasswordReset = new StaffPasswordReset();

  constructor(private staffService: ReducedStaffService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] !== "undefined") {
        this.id = params["id"];
        this.getStaff(params["id"]);
      }
    });
  }

  getStaff(id: UUID) {
    this.staffService.get(id).subscribe(
      next => {
        console.log(id, next)
        this.staff = next;
        this.model.staff_id = this.staff.id;
      },
      error => {
        console.log("Staff request failed");
      }
    )
  }

  reset() {
    console.log(this.staff, this.model);
    if (!this.model.staff_id) {
      M.toast({html: 'Failed to update password'}, 4000);
      return;
    }
    this.staffService.resetPassword(this.model).subscribe(x => {
        M.toast({html: 'Password updated'}, 4000);
        this.router.navigateByUrl(`/`);
    },
    x => {
        M.toast({html: 'Failed to update password'}, 4000);
    })
  }
}
