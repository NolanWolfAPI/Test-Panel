import {Component, forwardRef, Input} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export const DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropDownComponent),
  multi: true
};

@Component ({
  selector: "dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
  providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class DropDownComponent implements ControlValueAccessor{
  @Input() disabled : boolean = false;

  @Input() required : boolean = false;

  @Input() validate: boolean = false;

  @Input() additionalOptions:{key:string, value:string|number}[] = [];

  @Input() multiselect:boolean = false;

  @Input() options:{key:string, value:string|number}[] = [];

  @Input() label:string = "";

  @Input() id: UUID = UUID.UUID();

  protected innerValue:string = "";

  protected innerValues:string[] = [];

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get allOptions(): {key:string, value:string|number,selected?:boolean }[] {
    return this.additionalOptions.concat(this.options).map(option => {
      if (this.multiselect) {
        option['selected'] = this.innerValues ? this.innerValues.some(x => option.value === (typeof option.value === "string" ? x : Number(x))) : false;
      } else {
        option['selected'] = option.value === (typeof option.value === "string" ? this.innerValue : Number(this.innerValue));
      }
      return option
    });
  }

  get active() {
    return this.value && this.value.length > 0;
  }

  get value(): any {
    return this.multiselect ? this.innerValues : this.innerValue;
  };

  set value(v: any) {
    if (v !== this.value) {
      if (this.multiselect) {
        this.innerValues = v;
      } else {
        this.innerValue = v;
      }
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any): void {
    if (value !== this.value) {
      if (this.multiselect) {
        this.innerValues = value;
      } else {
        this.innerValue = value;
      }
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
