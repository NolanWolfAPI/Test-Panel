import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PlayerListComponent} from './components/player/list/player-list.component';
import {PageNotFound} from './components/page-not-found/page-not-found.component';
import {RankListComponent} from './components/rank/list/rank-list.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './services/auth-guard.service';
import {LayoutComponent} from './components/layout/layout.component';
import {GameListComponent} from './components/game/list/game-list.component';
import {GameEditorComponent} from './components/game/editor/game-editor.component';
import {GameModeEditorComponent} from './components/game/modes/editor/game-mode-editor.component';
import {VanityListComponent} from 'app/components/vanity/list/vanity-list.component';
import {VanityEditorComponent} from './components/vanity/editor/vanity-editor.component';
import {ReportListComponent} from './components/report/list/report-list.component';
import {ReportDetailsComponent} from './components/report/details/report-details.component';
import {StaffListComponent} from './components/staff/list/staff-list.component';
import {StaffEditorComponent} from './components/staff/editor/staff-editor.component';
import {PlayerEditorComponent} from './components/player/editor/player-editor.component';
import {RoleListComponent} from './components/roles/list/role-list.component';
import {RoleEditorComponent} from './components/roles/editor/role-editor.component';
import {CaseEditorComponent} from './components/cases/editor/case-editor.component';
import {CaseListComponent} from './components/cases/list/case-list.component';
import {ResetPasswordComponent} from './components/staff/reset-password/reset-password.component';
import {RankEditorComponent} from './components/rank/editor/rank-editor.component';
import {ChatFilterListComponent} from './components/chat-filters/list/chat-filter-list.component';
import {ChatFilterEditorComponent} from './components/chat-filters/editor/chat-filter-editor.component';
import {PhraseListComponent} from './components/translation/list/phrase-list.component';
import {PhraseEditorComponent} from './components/translation/editor/phrase-editor.component';
import {PunishmentListComponent} from "./components/punishment/list/punishment-list.component";
import {PunishmentEditorComponent} from "./components/punishment/editor/punishment-editor.component";
import {LanguageListComponent} from "./components/languages/list/language-list.component";
import {LanguageEditorComponent} from "./components/languages/editor/language-editor.component";
import {AdvertListComponent} from "./components/advert/list/advert-list.component";
import {AdvertEditorComponent} from "./components/advert/editor/advert-editor.component";
import {CustomApiConfigListComponent} from "./components/customapiconfig/list/customapiconfig-list.component";
import {CustomApiConfigEditorComponent} from "./components/customapiconfig/editor/customapiconfig-editor.component";
import {CaseCreatorComponent} from "./components/cases/creator/case-creator.component";

const routes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full', data: { name: 'Dashboard'/*, permission: "dashboard"*/ }},

    // Players
    { path: 'players', component: PlayerListComponent, data: { name: 'Players', permission: 'players.list' }},
    { path: 'players/:id/edit', component: PlayerEditorComponent, data: { name: 'Player Editor', permission: 'players.update' }},

    // Ranks
    { path: 'ranks', component: RankListComponent, data: { name: 'Ranks', permission: 'ranks.list' }},
    { path: 'ranks/new', component: RankEditorComponent, data: { name: 'Rank Editor', permission: 'ranks.create' }},
    { path: 'ranks/:id/edit', component: RankEditorComponent, data: { name: 'Rank Editor', permission: 'ranks.update' }},

    // Games
    { path: 'games', component: GameListComponent, data: { name: 'Games', permission: 'games.list' }},
    { path: 'games/new', component: GameEditorComponent, data: { name: 'Game Editor', permission: 'games.create' }},
    { path: 'games/:id/edit', component: GameEditorComponent, data: { name: 'Game Editor', permission: 'games.update' }},

    //Game Modes
    //{ path: 'games/modes', component: GameModeListComponent, pathMatch: 'full', data: { name: 'Game Modes', permission: 'games.modes.list' }},
    //{ path: 'games/:id/modes', component: GameModeListComponent, data: { name: 'Game\'s Modes', permission: 'games.modes.list' }},
    { path: 'games/:gameId/modes/new', component: GameModeEditorComponent, data: { name: 'Game Modes Details', permission: 'games.modes.create' }},
    { path: 'games/:gameId/modes/:id/edit', component: GameModeEditorComponent, data: { name: 'Game Modes Details', permission: 'games.modes.update' }},

    // Vanity
    { path: 'vanities', component: VanityListComponent, data: { name: 'Vantites', permission: 'vanities.list' }},
    { path: 'vanities/new', component: VanityEditorComponent, data: { name: 'Vanitie Editor', permission: 'vanities.create' }},
    { path: 'vanities/:id/edit', component: VanityEditorComponent, data: { name: 'Vanities Editor', permission: 'vanities.update' }},

    // Reports
    { path: 'reports', component: ReportListComponent, data: { name: 'Reports', permission: 'reports.list' }},
    { path: 'reports/:id', component: ReportDetailsComponent, data: { name: 'Report Details', permission: 'reports.details' }},

    // Staff
    { path: 'staff', component: StaffListComponent, data: { name: 'Staff', permission: 'staff.list' }},
    { path: 'staff/new', component: StaffEditorComponent, data: { name: 'Staff Editor', permission: 'staff.create' }},
    { path: 'staff/:id/edit', component: StaffEditorComponent, data: { name: 'Staff Editor', permission: 'staff.update' }},
    { path: 'staff/:id/resetpassword', component: ResetPasswordComponent, data: { name: 'Reset Password' }},

    // Roles
    { path: 'roles', component: RoleListComponent, data: { name: 'Roles', permission: 'roles.list' }},
    { path: 'roles/new', component: RoleEditorComponent, data: { name: 'Role Editor', permission: 'roles.create'  }},
    { path: 'roles/:id/edit', component: RoleEditorComponent, data: { name: 'Role Editor', permission: 'roles.update'  }},

    // Cases
    { path: 'cases', component: CaseListComponent, data: { name: 'Cases', permission: 'case.list' }},
    { path: 'cases/new', component: CaseCreatorComponent, data: { name: 'Case Creator', permission: 'case.create' }},
    { path: 'cases/:id/edit', component: CaseEditorComponent, data: { name: 'Case Editor', permission: 'case.update' }},

    // Chat filters
    { path: 'chatfilters', component: ChatFilterListComponent, data: { name: 'Chat Filters', permission: 'chatfilters.list' }},
    { path: 'chatfilters/new', component: ChatFilterEditorComponent, data: { name: 'Chat Filter Editor', permission: 'chatfilters.create' }},
    { path: 'chatfilters/:id/edit', component: ChatFilterEditorComponent, data: { name: 'Chat Filter Editor', permission: 'chatfilters.update' }},

    // Phrases
    { path: 'translations', component: PhraseListComponent, data: { name: 'Phrases', permission: 'phrase.list'}},
    { path: 'translations/new', component: PhraseEditorComponent, data: { name: 'Phrase Editor', permission: 'phrase.create'}},
    { path: 'translations/:id/edit', component: PhraseEditorComponent, data: { name: 'Phrase Editor', permission: 'phrase.update' }},

    // Punishments
    { path: 'punishments', component: PunishmentListComponent, data: { name: 'Punishments', permission: 'punishment.list'}},
    { path: 'punishments/new', component: PunishmentEditorComponent, data: { name: 'Punishment Editor', permission: 'punishment.create'}},
    { path: 'punishments/:id/edit', component: PunishmentEditorComponent, data: { name: 'Punishment Editor', permission: 'punishment.update' }},

    // Languages
    { path: 'languages', component: LanguageListComponent, data: { name: 'Languages', permission: 'languages.list'}},
    { path: 'languages/new', component: LanguageEditorComponent, data: { name: 'Language Editor', permission: 'languages.create'}},
    { path: 'languages/:id/edit', component: LanguageEditorComponent, data: { name: 'Language Editor', permission: 'languages.update' }},

    // Adverts
    { path: 'adverts', component: AdvertListComponent, data: { name: 'Adverts', permission: 'adverts.list'}},
    { path: 'adverts/new', component: AdvertEditorComponent, data: { name: 'Advert Editor', permission: 'adverts.create'}},
    { path: 'adverts/:id/edit', component: AdvertEditorComponent, data: { name: 'Advert Editor', permission: 'adverts.update' }},

    // Custom Api Configs
    { path: 'customapiconfigs', component: CustomApiConfigListComponent, data: { name: 'Custom Api Configs', permission: 'customapiconfigs.list' }},
    { path: 'customapiconfigs/new', component: CustomApiConfigEditorComponent, data: { name: 'Custom Api Config Editor', permission: 'customapiconfigs.create' }},
    { path: 'customapiconfigs/:id/edit', component: CustomApiConfigEditorComponent, data: { name: 'Custom Api Config Editor', permission: 'customapiconfigs.update' }},

    // Misc
    { path: '404', component: PageNotFound, data: { public:true }},
    { path: '**', redirectTo: '404'}
  ];


@NgModule({
  imports: [
    RouterModule.forRoot([{
      path: '',
      component: LayoutComponent,
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: routes
    }], {})
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {}
