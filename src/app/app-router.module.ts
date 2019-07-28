import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFound} from './page-not-found/page-not-found.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './shared/auth-guard.service';
import {LayoutComponent} from './layout/layout.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full', data: { name: 'Dashboard'/*, permission: "dashboard"*/ }},

    { path: 'players', loadChildren: () => import('./player/player.module').then(m => m.PlayerModule)},
    { path: 'ranks', loadChildren: () => import('./rank/rank.module').then(m => m.RankModule)},
    { path: 'games', loadChildren: () => import('./game/game.module').then(m => m.GameModule)},
    { path: 'vanities', loadChildren: () => import('./vanity/vanity.module').then(m => m.VanityModule)},
    { path: 'reports', loadChildren: () => import('./report/report.module').then(m => m.ReportModule)},
    { path: 'staff', loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule)},
    { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)},
    { path: 'cases', loadChildren: () => import('./cases/cases.module').then(m => m.CasesModule)},
    { path: 'chatfilters', loadChildren: () => import('./chat-filters/chat-filters.module').then(m => m.ChatFiltersModule)},   
    { path: 'translations', loadChildren: () => import('./translation/translation.module').then(m => m.TranslationModule)},
    { path: 'punishments', loadChildren: () => import('./punishment/punishment.module').then(m => m.PunishmentModule)},
    { path: 'languages', loadChildren: () => import('./languages/languages.module').then(m => m.LanguagesModule)},
    { path: 'adverts', loadChildren: () => import('./advert/advert.module').then(m => m.AdvertModule)},
    { path: 'customapiconfigs', loadChildren: () => import('./customapiconfig/customapiconfig.module').then(m => m.CustomApiConfigModule)},
    { path: '**', redirectTo: '404'}
  ];


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: LayoutComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: routes},
      { path: '404', component: PageNotFound},
      { path: '**', redirectTo: '404'}])
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {}
