import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertListComponent } from './list/advert-list.component';
import { AdvertEditorComponent } from './editor/advert-editor.component';


const routes: Routes = [
    { path: '', component: AdvertListComponent, data: { name: 'Adverts', permission: 'adverts.list'}},
    { path: 'new', component: AdvertEditorComponent, data: { name: 'Advert Editor', permission: 'adverts.create'}},
    { path: ':id/edit', component: AdvertEditorComponent, data: { name: 'Advert Editor', permission: 'adverts.update' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertRoutingModule { }
