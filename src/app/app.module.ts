import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-router.module';
import {PlayerService} from './services/player.service';
import {AppComponent} from './components/app/app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LayoutComponent} from './components/layout/layout.component';
import {PlayerListComponent} from './components/player/list/player-list.component';
import {NavigationComponent} from './components/shared/navigation/navigation.component';
import {SubNavigationComponent} from './components/shared/sub-navigation/sub-navigation.component';
import {PageNotFound} from './components/page-not-found/page-not-found.component';
import {RankService} from './services/rank.service';
import {RankListComponent} from './components/rank/list/rank-list.component';
import {AuthGuard} from './services/auth-guard.service';
import {GameService} from './services/game.service';
import {GameModeService} from './services/game-mode.service';
import {GameEditorComponent} from './components/game/editor/game-editor.component';
import {GameListComponent} from './components/game/list/game-list.component';
import {GameModeEditorComponent} from './components/game/modes/editor/game-mode-editor.component';
import {GameModeListComponent} from './components/game/modes/list/game-mode-list.component';
import {VanityEditorComponent} from './components/vanity/editor/vanity-editor.component';
import {VanityListComponent} from './components/vanity/list/vanity-list.component';
import {VanityService} from './services/vanity.service';
import {ReportService} from './services/reports.service';
import {ReportListComponent} from './components/report/list/report-list.component';
import {ReportDetailsComponent} from './components/report/details/report-details.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {StaffListComponent} from './components/staff/list/staff-list.component';
import {StaffService} from './services/staff.service';
import {StaffEditorComponent} from './components/staff/editor/staff-editor.component';
import {LoadingComponent} from './components/shared/loading/loading.component';
import {FormModule} from './components/shared/form/form.module';
import {PlayerEditorComponent} from './components/player/editor/player-editor.component';
import {RoleService} from './services/role.service';
import {RoleEditorComponent} from './components/roles/editor/role-editor.component';
import {RoleListComponent} from './components/roles/list/role-list.component';
import {JudgementSessionService} from './services/judgement-session.service';
import {CaseService} from './services/case.service';
import {PunishmentService} from './services/punishment.service';
import {CaseEditorComponent} from './components/cases/editor/case-editor.component';
import {CaseListComponent} from './components/cases/list/case-list.component';
import {ResetPasswordComponent} from './components/staff/reset-password/reset-password.component';
import {RankEditorComponent} from './components/rank/editor/rank-editor.component';
import {ChatFilterService} from './services/chat-filter.service';
import {ChatFilterListComponent} from './components/chat-filters/list/chat-filter-list.component';
import {ChatFilterEditorComponent} from './components/chat-filters/editor/chat-filter-editor.component';
import {PaginationComponent} from './components/shared/pagination/pagination.component';
import {PhraseService} from './services/phrase.service';
import {LanguageService} from './services/language.service';
import {PhraseListComponent} from './components/translation/list/phrase-list.component';
import {PhraseEditorComponent} from './components/translation/editor/phrase-editor.component';
import {CardComponent} from "./components/shared/card/card.component";
import {CaseTableComponent} from "./components/cases/table/table.component";
import {ChatboxComponent} from "./components/chat/chatbox/chatbox.component";
import {MessageComponent} from "./components/chat/message/message.component";
import {ChatService} from "./services/chat.service";
import {WebSocketService} from "./services/socket.service";
import {PunishmentEditorComponent} from "./components/punishment/editor/punishment-editor.component";
import {PunishmentListComponent} from "./components/punishment/list/punishment-list.component";
import {CurrencyService} from "./services/currency.service";
import {HasPermissionComponent} from "./components/shared/has-permission/has-permission.component";
import {IdentityService} from "app/services/identity.service";
import {ReducedPlayerService} from "./services/player.reduced.service";
import {ReducedStaffService} from "./services/staff.reduced.service";
import {LanguageListComponent} from "./components/languages/list/language-list.component";
import {LanguageEditorComponent} from "./components/languages/editor/language-editor.component";
import {AdvertService} from "./services/advert.service";
import {AdvertListComponent} from "./components/advert/list/advert-list.component";
import {AdvertEditorComponent} from "app/components/advert/editor/advert-editor.component";
import {CustomApiConfigService} from "./services/customapiconfig.service";
import {CustomApiConfigListComponent} from "./components/customapiconfig/list/customapiconfig-list.component";
import {CustomApiConfigEditorComponent} from "./components/customapiconfig/editor/customapiconfig-editor.component";
import {CaseCreatorComponent} from "./components/cases/creator/case-creator.component";
import {TableComponent} from "./components/shared/table/table.component";


@NgModule({
  declarations: [
    AdvertEditorComponent,
    AdvertListComponent,
    AppComponent,
    DashboardComponent,
    CardComponent,
    CaseCreatorComponent,
    CaseEditorComponent,
    CaseListComponent,
    CaseTableComponent,
    ChatboxComponent,
    ChatFilterEditorComponent,
    ChatFilterListComponent,
    CustomApiConfigEditorComponent,
    CustomApiConfigListComponent,
    GameEditorComponent,
    GameListComponent,
    GameModeEditorComponent,
    GameModeListComponent,
    HasPermissionComponent,
    LanguageEditorComponent,
    LanguageListComponent,
    LayoutComponent,
    LoadingComponent,
    MessageComponent,
    NavigationComponent,
    PageNotFound,
    PaginationComponent,
    PlayerEditorComponent,
    PlayerListComponent,
    PhraseEditorComponent,
    PhraseListComponent,
    PunishmentEditorComponent,
    PunishmentListComponent,
    RankEditorComponent,
    RankListComponent,
    ReportDetailsComponent,
    ReportListComponent,
    ResetPasswordComponent,
    RoleEditorComponent,
    RoleListComponent,
    StaffEditorComponent,
    StaffListComponent,
    SubNavigationComponent,
    TableComponent,
    VanityEditorComponent,
    VanityListComponent,
  ],
  imports: [
    OAuthModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormModule
  ],
  providers: [
    AdvertService,
    AuthGuard,
    CaseService,
    ChatService,
    ChatFilterService,
    CurrencyService,
    CustomApiConfigService,
    GameService,
    GameModeService,
    IdentityService,
    JudgementSessionService,
    PunishmentService,
    PlayerService,
    RankService,
    ReducedPlayerService,
    ReducedStaffService,
    ReportService,
    RoleService,
    StaffService,
    WebSocketService,
    VanityService,
    LanguageService,
    PhraseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
