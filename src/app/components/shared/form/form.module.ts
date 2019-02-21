import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TextBoxComponent} from "./text-box/text-box.component";
import {DropDownComponent} from "./dropdown/dropdown.component";
import {CheckBoxComponent} from "./checkbox/check-box.component";
import {PasswordBoxComponent} from "./password-box/password-box.component";
import {RankDropDownComponent} from "./rank-dropdown/rank-dropdown.component";
import {RoleDropDownComponent} from "./role-dropdown/role-dropdown.component";
import {PlayerSearchComponent} from "./player-search/player-search.component";
import {TextAreaBoxComponent} from "./textarea-box/textarea-box.component";
import {PermissionsEditorComponent} from "./permissions-editor/permissions-editor.component";
import {NumberBoxComponent} from "./number-box/number-box.component";
import {KeyValueEditorComponent} from "./keyvalue-editor/keyvalue-editor.component";
import {PlayerNamePreviewBoxComponent} from "./playernamepreview-box/playernamepreview-box.component";
import {TabKeyValueEditorComponent} from "./tab-keyvalue-editor/tab-keyvalue-editor.component";
import {ObjectEditorComponent} from "./object-editor/object-editor.component";
import {StaffDropDownComponent} from "./staff-dropdown/staff-dropdown.component";
import {ISO6391DropDownComponent} from "./iso6391-dropdown/iso6391-dropdown.component";
import {LanguageDropDownComponent} from "./language-dropdown/language-dropdown.component";
import {MaterialDropDownComponent} from "./material-dropdown/material-dropdown.component";
import {UUIDBoxComponent} from "./uuid-box/uuid-box.component";
import {PunishmentDropDownComponent} from "./punishment-dropdown/punishment-dropdown.component";


const items = [
  DropDownComponent,
  RankDropDownComponent,
  RoleDropDownComponent,
  StaffDropDownComponent,
  ISO6391DropDownComponent,
  LanguageDropDownComponent,
  MaterialDropDownComponent,
  PunishmentDropDownComponent,

  TextBoxComponent,
  TextAreaBoxComponent,
  PasswordBoxComponent,
  NumberBoxComponent,
  UUIDBoxComponent,

  CheckBoxComponent,

  PlayerSearchComponent,

  PermissionsEditorComponent,
  KeyValueEditorComponent,
  TabKeyValueEditorComponent,
  PlayerNamePreviewBoxComponent,
  ObjectEditorComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // MdButtonModule,
    // MdCheckboxModule,
    // MdAutocompleteModule,
    // MdDatepickerModule,
    // MdInputModule,
    // MdRadioModule,
    // MdSelectModule,
    // MdSlideToggleModule
  ],
  declarations: items,
  exports: items
})
export class FormModule { }
