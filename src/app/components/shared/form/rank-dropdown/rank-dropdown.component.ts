import {Component, forwardRef, OnInit} from "@angular/core";
import {DropDownComponent} from "../dropdown/dropdown.component";
import {RankService} from "../../../../services/rank.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

export const RANK_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RankDropDownComponent),
  multi: true
};

@Component ({
  selector: "rank-dropdown",
  templateUrl: "../dropdown/dropdown.component.html",
  styleUrls: ["../dropdown/dropdown.component.scss"],
  providers: [RANK_DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class RankDropDownComponent extends DropDownComponent implements OnInit{

  constructor(private rankService:RankService){
    super()
  }

  ngOnInit() {
    this.rankService.getAll().subscribe(
      data => {
        let values = data.map(item => {return {value:item.id, key:item.name}});
        this.options = values;
      }
    )
  }
}
