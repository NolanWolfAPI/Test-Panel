import {Component, forwardRef, Input} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

declare let M:any;

export const KEYVALUE_EDITOR_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KeyValueEditorComponent),
  multi: true
};

@Component ({
  selector: "keyvalue-editor",
  templateUrl: "./keyvalue-editor.component.html",
  styleUrls: ["./keyvalue-editor.component.scss"],
  providers: [KEYVALUE_EDITOR_CONTROL_VALUE_ACCESSOR]
})
export class KeyValueEditorComponent implements ControlValueAccessor {

  @Input() readonly : boolean = false;

  @Input() disabled : boolean = false;

  @Input() required : boolean = false;

  @Input() label:string = "";

  @Input() id: UUID = UUID.UUID();

  @Input() headers: string[] = [];

  @Input() keyCellRender:Function = (key) => key;

  @Input() newKeyDropdown: {key,value}[] = [];

  @Input() useNewKeyDowndown:boolean = false;

  @Input() newItem = '';

  @Input() editable: boolean = true;

  innerValue: {key,value}[] = [];

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  constructor() {
    this._onChange = this._onChange.bind(this);
  }

  get value(): Map<any, any> {
    return new Map(this.innerValue.map((value):[any,any] => [value.key,value.value]));
  }

  set value(v: Map<any, any>) {
    this.write(v);
    this.onChangeCallback(v);
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any): void {
    this.write(value)
  }

  write(v: Map<any, any>) {
    if (!v) return;
    try {
      let keys = Array.from(v.keys());
      this.innerValue = keys.map(key => {
        return {key: key, value: v.get(key)}
      });
    }catch (e) {
      this.innerValue = Object.keys(v).map(key => {return {key:key, value:v[key]}})
    }
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

  keyPressed(event) {
    if (event.key === 'Enter') event.preventDefault();
  }

  _onChange(event) {
    console.log('t', this.value)
    this.onChangeCallback(this.value);
  }

  valueType(item) {
    return typeof item.value;
  }

  delete(event, key) {
    this.innerValue = this.innerValue.filter(x => x.key !== key);
  }

  add(event) {
    if (!this.newItem) return;
    this.innerValue.push({key:this.newItem, value:''});
    this._onChange(event);
  }
}
