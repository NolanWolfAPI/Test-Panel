import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankListComponent } from './list/rank-list.component';
import { RankEditorComponent } from './editor/rank-editor.component';

const routes: Routes = [
    { path: '', component: RankListComponent, data: { name: 'Ranks', permission: 'ranks.list' }},
    { path: 'new', component: RankEditorComponent, data: { name: 'Rank Editor', permission: 'ranks.create' }},
    { path: ':id/edit', component: RankEditorComponent, data: { name: 'Rank Editor', permission: 'ranks.update' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankRoutingModule { }
