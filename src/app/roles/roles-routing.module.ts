import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleListComponent } from './list/role-list.component';
import { RoleEditorComponent } from './editor/role-editor.component';

const routes: Routes = [
    { path: '', component: RoleListComponent, data: { name: 'Roles', permission: 'roles.list' }},
    { path: 'new', component: RoleEditorComponent, data: { name: 'Role Editor', permission: 'roles.create'  }},
    { path: ':id/edit', component: RoleEditorComponent, data: { name: 'Role Editor', permission: 'roles.update'  }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
