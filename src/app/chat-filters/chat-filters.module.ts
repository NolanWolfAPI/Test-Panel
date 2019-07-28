import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatFiltersRoutingModule } from './chat-filters-routing.module';
import { ChatFilterEditorComponent } from './editor/chat-filter-editor.component';
import { ChatFilterListComponent } from './list/chat-filter-list.component';
import { ChatFilterService } from './chat-filter.service';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    ChatFilterEditorComponent,
    ChatFilterListComponent
  ],
  imports: [
    CommonModule,
    ChatFiltersRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    OAuthModule
  ],
  providers: [
    ChatFilterService
  ]
})
export class ChatFiltersModule { }
