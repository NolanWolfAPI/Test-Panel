import {Component, forwardRef, Input} from "@angular/core";
import {UUID} from "angular2-uuid";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

export const CHECK_BOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckBoxComponent),
  multi: true
};

@Component ({
  selector: "check-box",
  templateUrl: "./check-box.component.html",
  styleUrls: ["./check-box.component.scss"],
  providers: [CHECK_BOX_CONTROL_VALUE_ACCESSOR]
})
export class CheckBoxComponent {
  @Input() readonly : boolean = false;

  @Input() disabled : boolean = false;

  @Input() required : boolean = false;

  @Input() validate: boolean = false;

  @Input() label:string = "";

  @Input() id: UUID = UUID.UUID();

  @Input() onChange: Function = (e) => this.onChangeCallback(this.value);

  private innerValue:boolean = false;
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
