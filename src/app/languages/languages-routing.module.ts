import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageEditorComponent } from './editor/language-editor.component';
import { LanguageListComponent } from './list/language-list.component';

const routes: Routes = [
    { path: '', component: LanguageListComponent, data: { name: 'Languages', permission: 'languages.list'}},
    { path: 'new', component: LanguageEditorComponent, data: { name: 'Language Editor', permission: 'languages.create'}},
    { path: ':id/edit', component: LanguageEditorComponent, data: { name: 'Language Editor', permission: 'languages.update' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguagesRoutingModule { }
