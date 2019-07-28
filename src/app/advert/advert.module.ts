import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from "@angular/router";
import { AdvertRoutingModule } from './advert-routing.module';
import { AdvertService } from './advert.service';
import { AdvertEditorComponent } from './editor/advert-editor.component';
import { AdvertListComponent } from './list/advert-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AdvertEditorComponent,
    AdvertListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdvertRoutingModule,
    SharedModule,
  ],
  providers: [
    AdvertService
  ],
  exports: []
})
export class AdvertModule { }
