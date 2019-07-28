import {Component, ElementRef, Input, OnChanges, ViewChild} from "@angular/core";
import {UUID} from "angular2-uuid";
import {OAuthService} from "angular-oauth2-oidc";
import {Log} from "../../models/api/plugins/moderation/judgement-session";
import {Subject} from "rxjs";

@Component ({
  selector: "chatbox",
  templateUrl: "./chatbox.component.html",
  styleUrls: ["./chatbox.component.scss"],
})
export class ChatboxComponent implements OnChanges {

  @Input() fullscreen: boolean = false;

  @Input() chatSession: Subject<any>;

  @Input() oldMessages: Log[] = [];

  sessionNotAvailable:boolean = false;


  messages: Log[] = [];

  selfUUID:UUID = '';
  currentMessage:string = '';

  @ViewChild('messageBox', {read: ElementRef}) boxRefernce: ElementRef;

  constructor(private authService: OAuthService) {
    this.recieveMessage = this.recieveMessage.bind(this);
  }

  ngOnChanges(changes): void {
    this.messages = (this.oldMessages ? this.oldMessages : []).map(x => x);
    const claims:any = this.authService.getIdentityClaims();
    this.selfUUID = claims ? claims.user_id : '';

    if (changes.chatSession) {
      if (changes.chatSession.previousValue !== changes.chatSession.currentValue && this.chatSession) {
        this.sessionNotAvailable = false;
        this.chatSession.subscribe(this.recieveMessage, console.error, () => {
          this.sessionNotAvailable = true;
        })
      }
      else this.sessionNotAvailable = true;
    }
    this.scrollToBottom();
  }

  keypressed(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.send(this.currentMessage);
    }

  }

  send(message) {
    if (message.length <= 0 || this.sessionNotAvailable) return;
    const data = {
      uuid: this.selfUUID,
      text: message
    };
    this.chatSession.next(data);
    this.currentMessage = '';
  }

  recieveMessage(message) {
    this.messages.push(message);
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.boxRefernce.nativeElement.scrollTop = Number.MAX_SAFE_INTEGER;
    }, 0);
  }
}
