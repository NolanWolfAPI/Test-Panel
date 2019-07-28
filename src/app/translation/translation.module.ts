import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationRoutingModule } from './translation-routing.module';
import { PhraseEditorComponent } from './editor/phrase-editor.component';
import { PhraseListComponent } from './list/phrase-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { LanguagesModule } from 'app/languages/languages.module';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    PhraseEditorComponent,
    PhraseListComponent
  ],
  imports: [
    CommonModule,
    TranslationRoutingModule,
    SharedModule,
    FormsModule,
    LanguagesModule,
  ]
})
export class TranslationModule { }
