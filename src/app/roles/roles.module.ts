import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RoleEditorComponent } from './editor/role-editor.component';
import { RoleListComponent } from './list/role-list.component';
import { RoleDropDownComponent } from './role-dropdown/role-dropdown.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    RoleEditorComponent,
    RoleListComponent,
    RoleDropDownComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    RoleDropDownComponent
  ]
})
export class RolesModule { }
