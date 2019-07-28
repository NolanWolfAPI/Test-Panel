import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffListComponent } from './list/staff-list.component';
import { StaffEditorComponent } from './editor/staff-editor.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    { path: '', component: StaffListComponent, data: { name: 'Staff', permission: 'staff.list' }},
    { path: 'new', component: StaffEditorComponent, data: { name: 'Staff Editor', permission: 'staff.create' }},
    { path: ':id/edit', component: StaffEditorComponent, data: { name: 'Staff Editor', permission: 'staff.update' }},
    { path: ':id/resetpassword', component: ResetPasswordComponent, data: { name: 'Reset Password' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
