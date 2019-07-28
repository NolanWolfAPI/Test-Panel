import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { RankModule } from 'app/rank/rank.module';
import { PlayerListComponent } from './list/player-list.component';
import { PlayerEditorComponent } from './editor/player-editor.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { LanguagesModule } from 'app/languages/languages.module';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { PlayerService } from './player.service';
import { ReducedPlayerService } from './player.reduced.service';

@NgModule({
  declarations: [
    PlayerListComponent,
    PlayerEditorComponent,
    PlayerSearchComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    RankModule,
    FormsModule,
    SharedModule,
    LanguagesModule,
  ],
  providers: [
    PlayerService,
    ReducedPlayerService
  ],
  exports: [
    PlayerSearchComponent
  ]
})
export class PlayerModule { }
