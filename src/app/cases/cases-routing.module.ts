import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseListComponent } from './list/case-list.component';
import { CaseCreatorComponent } from './creator/case-creator.component';
import { CaseEditorComponent } from './editor/case-editor.component';


const routes: Routes = [
  { path: '', component: CaseListComponent, data: { name: 'Cases', permission: 'case.list' }},
  { path: 'new', component: CaseCreatorComponent, data: { name: 'Case Creator', permission: 'case.create' }},
  { path: ':id/edit', component: CaseEditorComponent, data: { name: 'Case Editor', permission: 'case.update' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule { }
