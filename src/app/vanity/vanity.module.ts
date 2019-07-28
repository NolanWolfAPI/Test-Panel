import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VanityRoutingModule } from './vanity-routing.module';
import { VanityEditorComponent } from './editor/vanity-editor.component';
import { VanityListComponent } from './list/vanity-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    VanityEditorComponent,
    VanityListComponent
  ],
  imports: [
    CommonModule,
    VanityRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    OAuthModule
  ]
})
export class VanityModule { }
