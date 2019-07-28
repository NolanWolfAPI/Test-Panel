import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameEditorComponent } from './editor/game-editor.component';
import { GameListComponent } from './list/game-list.component';
import { GameModeEditorComponent } from './modes/editor/game-mode-editor.component';
import { GameModeListComponent } from './modes/list/game-mode-list.component';
import { GameService } from './game.service';
import { GameModeService } from './game-mode.service';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    GameEditorComponent,
    GameListComponent,
    GameModeEditorComponent,
    GameModeListComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    OAuthModule
  ],
  providers: [
    GameService,
    GameModeService
  ]
})
export class GameModule { }
