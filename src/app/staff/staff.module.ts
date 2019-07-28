import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { RankModule } from 'app/rank/rank.module';
import { StaffEditorComponent } from './editor/staff-editor.component';
import { StaffListComponent } from './list/staff-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StaffDropDownComponent } from './staff-dropdown/staff-dropdown.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RolesModule } from 'app/roles/roles.module';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { StaffService } from './staff.service';
import { ReducedStaffService } from './staff.reduced.service';
import { PlayerModule } from 'app/player/player.module';

@NgModule({
  declarations: [
    StaffEditorComponent,
    StaffListComponent,
    ResetPasswordComponent,
    StaffDropDownComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    RankModule,
    SharedModule,
    FormsModule,
    RolesModule,
    PlayerModule,
    RankModule
  ],
  providers:[
    StaffService,
    ReducedStaffService
  ],
  exports: [
    StaffDropDownComponent
  ]
})
export class StaffModule { }
