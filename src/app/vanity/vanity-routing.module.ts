import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VanityListComponent } from './list/vanity-list.component';
import { VanityEditorComponent } from './editor/vanity-editor.component';

const routes: Routes = [
    { path: '', component: VanityListComponent, data: { name: 'Vantites', permission: 'vanities.list' }},
    { path: 'new', component: VanityEditorComponent, data: { name: 'Vanitie Editor', permission: 'vanities.create' }},
    { path: ':id/edit', component: VanityEditorComponent, data: { name: 'Vanities Editor', permission: 'vanities.update' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanityRoutingModule { }
