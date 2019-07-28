import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFound} from './page-not-found/page-not-found.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './shared/auth-guard.service';
import {LayoutComponent} from './layout/layout.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full', data: { name: 'Dashboard'/*, permission: "dashboard"*/ }},

    { path: 'players', loadChildren: './player/player.module#PlayerModule'},
    { path: 'ranks', loadChildren: './rank/rank.module#RankModule'},
    { path: 'games', loadChildren: './game/game.module#GameModule'},
    { path: 'vanities', loadChildren: './vanity/vanity.module#VanityModule'},
    { path: 'reports', loadChildren: './report/report.module#ReportModule'},
    { path: 'staff', loadChildren: './staff/staff.module#StaffModule'},
    { path: 'roles', loadChildren: './roles/roles.module#RolesModule'},
    { path: 'cases', loadChildren: './cases/cases.module#CasesModule'},
    { path: 'chatfilters', loadChildren: './chat-filters/chat-filters.module#ChatFiltersModule'},   
    { path: 'translations', loadChildren: './translation/translation.module#TranslationModule'},
    { path: 'punishments', loadChildren: './punishment/punishment.module#PunishmentModule'},
    { path: 'languages', loadChildren: './languages/languages.module#LanguagesModule'},
    { path: 'adverts', loadChildren: './advert/advert.module#AdvertModule'},
    { path: 'customapiconfigs', loadChildren: './customapiconfig/customapiconfig.module#CustomApiConfigModule'},
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
