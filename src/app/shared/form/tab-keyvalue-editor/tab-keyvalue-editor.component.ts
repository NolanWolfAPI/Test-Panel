import {Component, ElementRef, forwardRef, ViewChild} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {KeyValueEditorComponent} from "../keyvalue-editor/keyvalue-editor.component";

declare let M:any;

export const TAB_KEYVALUE_EDITOR_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TabKeyValueEditorComponent),
  multi: true
};

@Component ({
  selector: "tab-keyvalue-editor",
  templateUrl: "./tab-keyvalue-editor.component.html",
  styleUrls: ["./tab-keyvalue-editor.component.scss"],
  providers: [TAB_KEYVALUE_EDITOR_CONTROL_VALUE_ACCESSOR]
})
export class TabKeyValueEditorComponent extends KeyValueEditorComponent {

  @ViewChild('tabs', {read: ElementRef}) tabs: ElementRef;

  writeCallback(data) {
    //M.Tabs.init(this.tabs.nativeElement)
  }
}
