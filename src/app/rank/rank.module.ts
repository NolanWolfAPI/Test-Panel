import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankRoutingModule } from './rank-routing.module';
import { RankEditorComponent } from './editor/rank-editor.component';
import { RankListComponent } from './list/rank-list.component';
import { RankDropDownComponent } from './rank-dropdown/rank-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    RankEditorComponent,
    RankListComponent,
    RankDropDownComponent
  ],
  imports: [
    CommonModule,
    RankRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    OAuthModule
  ],
  exports: [
    RankDropDownComponent
  ]
})
export class RankModule { }
