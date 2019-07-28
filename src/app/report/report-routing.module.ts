import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportListComponent } from './list/report-list.component';
import { ReportDetailsComponent } from './details/report-details.component';

const routes: Routes = [
  { path: '', component: ReportListComponent, data: { name: 'Reports', permission: 'reports.list' }},
    { path: ':id', component: ReportDetailsComponent, data: { name: 'Report Details', permission: 'reports.details' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
