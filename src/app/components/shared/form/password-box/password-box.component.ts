import {Component, forwardRef, Input} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


export const PASSWORD_BOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PasswordBoxComponent),
  multi: true
};

@Component ({
  selector: "password-box",
  templateUrl: "./password-box.component.html",
  styleUrls: ["./password-box.component.scss"],
  providers: [PASSWORD_BOX_CONTROL_VALUE_ACCESSOR]
})
export class PasswordBoxComponent implements ControlValueAccessor{

  @Input() readonly : boolean = false;

  @Input() disabled : boolean = false;

  @Input() required : boolean = false;

  @Input() label:string = "";

  @Input() id: UUID = UUID.UUID();

  private innerValue:string = "";
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get active() {
    return this.value && this.value.length > 0;
  }

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
