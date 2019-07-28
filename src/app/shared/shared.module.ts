import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityService } from './identity.service';
import { WebSocketService } from './socket.service';
import { CardComponent } from './card/card.component';
import { LoadingComponent } from './loading/loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TableComponent } from './table/table.component';
import { DropDownComponent } from './form/dropdown/dropdown.component';
import { ISO6391DropDownComponent } from './form/iso6391-dropdown/iso6391-dropdown.component';
import { MaterialDropDownComponent } from './form/material-dropdown/material-dropdown.component';
import { TextBoxComponent } from './form/text-box/text-box.component';
import { TextAreaBoxComponent } from './form/textarea-box/textarea-box.component';
import { PasswordBoxComponent } from './form/password-box/password-box.component';
import { NumberBoxComponent } from './form/number-box/number-box.component';
import { UUIDBoxComponent } from './form/uuid-box/uuid-box.component';
import { CheckBoxComponent } from './form/checkbox/check-box.component';
import { PermissionsEditorComponent } from './form/permissions-editor/permissions-editor.component';
import { KeyValueEditorComponent } from './form/keyvalue-editor/keyvalue-editor.component';
import { TabKeyValueEditorComponent } from './form/tab-keyvalue-editor/tab-keyvalue-editor.component';
import { PlayerNamePreviewBoxComponent } from './form/playernamepreview-box/playernamepreview-box.component';
import { ObjectEditorComponent } from './form/object-editor/object-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HasPermissionComponent } from 'app/shared/has-permission/has-permission.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CurrencyService } from './currency.service';
import { AuthGuard } from './auth-guard.service';

const comps = [
  CardComponent,
  LoadingComponent,
  PaginationComponent,
  TableComponent,

  DropDownComponent,
  ISO6391DropDownComponent,
  MaterialDropDownComponent,

  TextBoxComponent,
  TextAreaBoxComponent,
  PasswordBoxComponent,
  NumberBoxComponent,
  UUIDBoxComponent,

  CheckBoxComponent,

  PermissionsEditorComponent,
  KeyValueEditorComponent,
  TabKeyValueEditorComponent,
  PlayerNamePreviewBoxComponent,
  ObjectEditorComponent,
  HasPermissionComponent
];

@NgModule({
  declarations: comps,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    OAuthModule
  ],
  providers: [
    IdentityService,
    CurrencyService,
    WebSocketService,
    AuthGuard
  ],
  exports: comps
})
export class SharedModule { }
