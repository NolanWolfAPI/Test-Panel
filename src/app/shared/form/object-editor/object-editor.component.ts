import {Component, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

declare let M:any;

export const OBJECT_EDITOR_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ObjectEditorComponent),
  multi: true
};

@Component ({
  selector: "object-editor",
  templateUrl: "./object-editor.component.html",
  styleUrls: ["./object-editor.component.scss"],
  providers: [OBJECT_EDITOR_CONTROL_VALUE_ACCESSOR]
})
export class ObjectEditorComponent implements ControlValueAccessor {

  @Input() required : boolean = false;

  @Input() onChange: Function = (e) => this.onChangeCallback(this.value);

  innerValue:any[] = [];

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  constructor() {
    this.onChange = this.onChange.bind(this);
  }

  get value(): object {
    return this.innerValue.reduce((a,v,i) => {
      a[i] = v;
      return a;
    },{});
  }

  set value(v: object) {
    this.write(v);
    this.onChangeCallback(v);
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any): void {
    this.write(value)
  }

  write(v: object) {
    if (!v) v = {};
    this.innerValue = Object.keys(v).reduce((a,val) => a.concat({key:val, value:v[val]}),[]);
    this.writeCallback(v);
  }

  writeCallback(data) {
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  valueType(item) {
    return typeof item.value;
  }
}
