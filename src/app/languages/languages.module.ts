import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguagesRoutingModule } from './languages-routing.module';
import { LanguageEditorComponent } from './editor/language-editor.component';
import { LanguageListComponent } from './list/language-list.component';
import { LanguageDropDownComponent } from 'app/languages/language-dropdown/language-dropdown.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { LanguageService } from './language.service';

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
  providers: [
    LanguageService
  ],
  exports: [
    LanguageDropDownComponent
  ]
})
export class LanguagesModule { }
