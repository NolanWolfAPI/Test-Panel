import {Component, forwardRef, OnInit} from "@angular/core";
import {UUID} from "angular2-uuid";
import {DropDownComponent} from "../../shared/form/dropdown/dropdown.component";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ReducedPlayerService} from "../../player/player.reduced.service";
import {ReducedPlayer} from "../../models/api/reducedplayer";
import {ReducedStaffService} from "../staff.reduced.service";
import {ReducedStaff} from "../../models/core/reducedstaff";

export const STAFF_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StaffDropDownComponent),
  multi: true
};

@Component ({
  selector: "staff-dropdown",
  templateUrl: "../../shared/form/dropdown/dropdown.component.html",
  styleUrls: ["../../shared/form/dropdown/dropdown.component.scss"],
  providers: [STAFF_DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class StaffDropDownComponent extends DropDownComponent implements OnInit{

  staff:ReducedStaff[] = [];
  players:ReducedPlayer[] = [];

  constructor(private staffService:ReducedStaffService, private playerService:ReducedPlayerService){
    super()
  }

  ngOnInit() {
    this.staffService.getAll().subscribe(
      data => {
        this.staff = data;
      },error => console.error,
      () => {
        this.getPlayers(this.staff.map(x => x.user_id));
      }
    )
  }

  getPlayers(ids: UUID[]) {
    this.playerService.getByIds(ids).subscribe(
      data => {
        this.players = data;
      }, error => console.error,
      () => {
        this.options = this.staff.filter(x => x.user_id !== null).map(member => {
          const player = this.players.find(p => p.id === member.user_id);
          return {value:member.user_id.toString(), key:`${player ? player.displayName : member.user_id.toString()}${member.isActive ? '' : ' (DISABLED)'}`}
        });
      }
    )
  }
}
