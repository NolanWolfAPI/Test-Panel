import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomApiConfigRoutingModule } from './customapiconfig-routing.module';
import { CustomApiConfigEditorComponent } from './editor/customapiconfig-editor.component';
import { CustomApiConfigListComponent } from './list/customapiconfig-list.component';
import { CustomApiConfigService } from './customapiconfig.service';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    CustomApiConfigEditorComponent,
    CustomApiConfigListComponent
  ],
  imports: [
    CommonModule,
    CustomApiConfigRoutingModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    CustomApiConfigService
  ]
})
export class CustomApiConfigModule { }
