import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomApiConfigListComponent } from './list/customapiconfig-list.component';
import { CustomApiConfigEditorComponent } from './editor/customapiconfig-editor.component';

const routes: Routes = [
    { path: '', component: CustomApiConfigListComponent, data: { name: 'Custom Api Configs', permission: 'customapiconfigs.list' }},
    { path: 'new', component: CustomApiConfigEditorComponent, data: { name: 'Custom Api Config Editor', permission: 'customapiconfigs.create' }},
    { path: ':id/edit', component: CustomApiConfigEditorComponent, data: { name: 'Custom Api Config Editor', permission: 'customapiconfigs.update' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomApiConfigRoutingModule { }
