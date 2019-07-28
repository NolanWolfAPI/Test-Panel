import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-router.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFound } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { SubNavigationComponent } from './layout/sub-navigation/sub-navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    PageNotFound,
    NavigationComponent,
    SubNavigationComponent,
  ],
  imports: [
    OAuthModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
