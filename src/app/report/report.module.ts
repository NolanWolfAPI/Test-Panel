import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportDetailsComponent } from './details/report-details.component';
import { ReportListComponent } from './list/report-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    ReportDetailsComponent,
    ReportListComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
  ]
})
export class ReportModule { }
