import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PunishmentEditorComponent } from './editor/punishment-editor.component';
import { PunishmentListComponent } from './list/punishment-list.component';

const routes: Routes = [
    { path: '', component: PunishmentListComponent, data: { name: 'Punishments', permission: 'punishment.list'}},
    { path: 'new', component: PunishmentEditorComponent, data: { name: 'Punishment Editor', permission: 'punishment.create'}},
    { path: ':id/edit', component: PunishmentEditorComponent, data: { name: 'Punishment Editor', permission: 'punishment.update' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PunishmentRoutingModule { }
