import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhraseListComponent } from './list/phrase-list.component';
import { PhraseEditorComponent } from './editor/phrase-editor.component';

const routes: Routes = [
  { path: '', component: PhraseListComponent, data: { name: 'Phrases', permission: 'phrase.list'}},
  { path: 'new', component: PhraseEditorComponent, data: { name: 'Phrase Editor', permission: 'phrase.create'}},
  { path: ':id/edit', component: PhraseEditorComponent, data: { name: 'Phrase Editor', permission: 'phrase.update' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationRoutingModule { }
