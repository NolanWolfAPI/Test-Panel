import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './list/game-list.component';
import { GameEditorComponent } from './editor/game-editor.component';
import { GameModeEditorComponent } from './modes/editor/game-mode-editor.component';

const routes: Routes = [
    { path: '', component: GameListComponent, data: { name: 'Games', permission: 'games.list' }},
    { path: 'new', component: GameEditorComponent, data: { name: 'Game Editor', permission: 'games.create' }},
    { path: ':id/edit', component: GameEditorComponent, data: { name: 'Game Editor', permission: 'games.update' }},
    { path: ':gameId/modes/new', component: GameModeEditorComponent, data: { name: 'Game Modes Details', permission: 'games.modes.create' }},
    { path: ':gameId/modes/:id/edit', component: GameModeEditorComponent, data: { name: 'Game Modes Details', permission: 'games.modes.update' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
