import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

declare let M:any;

export const TEXTAREA_BOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextAreaBoxComponent),
  multi: true
};

@Component ({
  selector: "textarea-box",
  templateUrl: "./textarea-box.component.html",
  styleUrls: ["./textarea-box.component.scss"],
  providers: [TEXTAREA_BOX_CONTROL_VALUE_ACCESSOR]
})
export class TextAreaBoxComponent implements ControlValueAccessor, OnInit{

  @Input() readonly : boolean = false;

  @Input() disabled : boolean = false;

  @Input() required : boolean = false;

  @Input() label:string = "";

  @Input() id: UUID = UUID.UUID();

  @ViewChild('box', {read: ElementRef}) boxRefernce: ElementRef;

  private innerValue:string = "";
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get active() {
    return this.value && this.value.length > 0;
  }

  get value(): any {
    M.textareaAutoResize(this.boxRefernce.nativeElement);
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      M.textareaAutoResize(this.boxRefernce.nativeElement);
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
    M.textareaAutoResize(this.boxRefernce.nativeElement);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnInit(): void {

  }
}
