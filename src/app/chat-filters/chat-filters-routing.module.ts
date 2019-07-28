import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatFilterListComponent } from './list/chat-filter-list.component';
import { ChatFilterEditorComponent } from './editor/chat-filter-editor.component';

const routes: Routes = [
    { path: '', component: ChatFilterListComponent, data: { name: 'Chat Filters', permission: 'chatfilters.list' }},
    { path: 'new', component: ChatFilterEditorComponent, data: { name: 'Chat Filter Editor', permission: 'chatfilters.create' }},
    { path: ':id/edit', component: ChatFilterEditorComponent, data: { name: 'Chat Filter Editor', permission: 'chatfilters.update' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatFiltersRoutingModule { }
