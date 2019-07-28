import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguagesRoutingModule } from './languages-routing.module';
import { LanguageEditorComponent } from './editor/language-editor.component';
import { LanguageListComponent } from './list/language-list.component';
import { LanguageDropDownComponent } from 'app/shared/form/language-dropdown/language-dropdown.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    LanguageEditorComponent,
    LanguageListComponent,
    LanguageDropDownComponent
  ],
  imports: [
    CommonModule,
    LanguagesRoutingModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    LanguageDropDownComponent
  ]
})
export class LanguagesModule { }
