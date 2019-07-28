import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListComponent } from './list/player-list.component';
import { PlayerEditorComponent } from './editor/player-editor.component';

const routes: Routes = [
    { path: '', component: PlayerListComponent, data: { name: 'Players', permission: 'players.list' }},
    { path: ':id/edit', component: PlayerEditorComponent, data: { name: 'Player Editor', permission: 'players.update' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
