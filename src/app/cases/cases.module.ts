import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from "@angular/router";
import { CasesRoutingModule } from './cases-routing.module';
import { CaseService } from './case.service';
import { JudgementSessionService } from './judgement-session.service';
import { CaseCreatorComponent } from './creator/case-creator.component';
import { CaseEditorComponent } from './editor/case-editor.component';
import { CaseListComponent } from './list/case-list.component';
import { CaseTableComponent } from './table/table.component';
import { RankModule } from 'app/rank/rank.module';
import { SharedModule } from 'app/shared/shared.module';
import { PlayerModule } from 'app/player/player.module';
import { PunishmentModule } from 'app/punishment/punishment.module';
import { StaffModule } from 'app/staff/staff.module';
import { ChatModule } from 'app/chat/chat.module';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    CaseCreatorComponent,
    CaseEditorComponent,
    CaseListComponent,
    CaseTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    CasesRoutingModule,
    RankModule,
    SharedModule,
    FormsModule,
    PlayerModule,
    PunishmentModule,
    StaffModule,
    ChatModule,
    OAuthModule
  ],
  providers: [
    CaseService,
    JudgementSessionService
  ],
  exports: []
})
export class CasesModule { }
