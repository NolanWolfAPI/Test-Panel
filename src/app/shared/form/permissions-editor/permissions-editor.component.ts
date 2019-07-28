import {Component, ElementRef, forwardRef, Input, ViewChild} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import PermissionList from "./permissionList";

declare let M:any;

export const PERMISSIONS_EDITOR_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PermissionsEditorComponent),
  multi: true
};

@Component ({
  selector: "permissions-editor",
  templateUrl: "./permissions-editor.component.html",
  styleUrls: ["./permissions-editor.component.scss"],
  providers: [PERMISSIONS_EDITOR_CONTROL_VALUE_ACCESSOR]
})
export class PermissionsEditorComponent implements ControlValueAccessor {

  @Input() readonly : boolean = false;

  @Input() disabled : boolean = false;

  @Input() required : boolean = false;

  @Input() panelPermission : boolean = false;

  @Input() apiPermission : boolean = false;

  @Input() gamePermission : boolean = false;

  @Input() label:string = "";

  @Input() id: UUID = UUID.UUID();

  @ViewChild('chips', {read: ElementRef}) boxRefernce: ElementRef;

  private innerValue:string[] = [];

  private get options() {
    return {
      data: [],
      placeholder: 'Find a Permission',
      secondaryPlaceholder: '+Permission',
      autocompleteOptions: {
        data: PermissionList.getAutoCompletePermission({
          panel: this.panelPermission,
          api: this.apiPermission,
          game: this.gamePermission,
        }),
        limit: Infinity,
        minLength: 1
      },
      onChipAdd:this.onChipsChanged.bind(this),
      onChipSelect:this.onChipsChanged.bind(this),
      onChipDelete:this.onChipsChanged.bind(this),
    };
  }

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get active() {
    return this.value && this.value.length > 0;
  }

  get value(): any[] {
    return this.innerValue;
  }

  set value(v: any[]) {
    this.write(v);
    this.onChangeCallback(v);
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any): void {
    this.write(value);
  }

  write(v:any[]){
    if (!v) v = [];
    this.innerValue = v;
    let options = this.options;
    options.data = v.sort().reduce((a,v) => a.concat({tag:v}), []);
    M.Chips.init(this.boxRefernce.nativeElement, options);
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

  onChipsChanged() {
    let data = M.Chips.getInstance(this.boxRefernce.nativeElement).chipsData;
    this.value = data.reduce((a,v) => a.concat(v.tag),[])
  }
}
