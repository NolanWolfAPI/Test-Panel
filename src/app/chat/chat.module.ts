import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { MessageComponent } from './message/message.component';
import { ChatService } from './chat.service';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    ChatboxComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    OAuthModule
  ],
  providers: [
    ChatService
  ],
  exports: [
    ChatboxComponent
  ]
})
export class ChatModule { }
