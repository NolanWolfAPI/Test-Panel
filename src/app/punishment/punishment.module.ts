import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PunishmentRoutingModule } from './punishment-routing.module';
import { PunishmentEditorComponent } from './editor/punishment-editor.component';
import { PunishmentListComponent } from './list/punishment-list.component';
import { PunishmentDropDownComponent } from 'app/punishment/punishment-dropdown/punishment-dropdown.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    PunishmentEditorComponent,
    PunishmentListComponent,
    PunishmentDropDownComponent
  ],
  imports: [
    CommonModule,
    PunishmentRoutingModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    PunishmentDropDownComponent
  ]
})
export class PunishmentModule { }
