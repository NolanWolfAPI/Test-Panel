import {Component, forwardRef, OnInit} from "@angular/core";
import {DropDownComponent} from "../dropdown/dropdown.component";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {PunishmentService} from "../../../../services/punishment.service";

export const PUNISHMENT_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PunishmentDropDownComponent),
  multi: true
};

@Component ({
  selector: "punishment-dropdown",
  templateUrl: "../dropdown/dropdown.component.html",
  styleUrls: ["../dropdown/dropdown.component.scss"],
  providers: [PUNISHMENT_DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class PunishmentDropDownComponent extends DropDownComponent implements OnInit {

  constructor(private punishmentService:PunishmentService){
    super()
    this.multiselect = true;
  }

  ngOnInit() {
    this.punishmentService.getAll().subscribe(
      data => {
        let values = data.map(item => {return {value:item.id, key:item.name}});
        this.options = values;
      }
    )
  }
}
