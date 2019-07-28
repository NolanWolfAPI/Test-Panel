import {Component, forwardRef, Input} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


export const NUMBER_BOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumberBoxComponent),
  multi: true
};

@Component ({
  selector: "number-box",
  templateUrl: "./number-box.component.html",
  styleUrls: ["./number-box.component.scss"],
  providers: [NUMBER_BOX_CONTROL_VALUE_ACCESSOR]
})
export class NumberBoxComponent implements ControlValueAccessor{

  @Input() subText: string = "";

  @Input() min : number = Number.MIN_SAFE_INTEGER;

  @Input() max : number = Number.MAX_SAFE_INTEGER;

  @Input() validate : boolean = false;
  @Input() readonly : boolean = false;

  @Input() disabled : boolean = false;

  @Input() required : boolean = false;

  @Input() label:string = "";

  @Input() id: UUID = UUID.UUID();

  @Input() onChange: Function = (e) => this.onChangeCallback(this.value);

  private innerValue:number = 0;
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

  keyPressed(event) {
    if (event.key === 'Enter') event.preventDefault();
  }
}
