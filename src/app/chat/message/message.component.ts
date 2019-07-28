import {Component, Input} from "@angular/core";
import {UUID} from "angular2-uuid";
import {OAuthService} from "angular-oauth2-oidc";
import {unix} from "moment";

@Component ({
  selector: "message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
})
export class MessageComponent {
  @Input() uuid: UUID = '';
  @Input() text: string = '';
  @Input() timecode: number = 0;

  constructor(private authService: OAuthService) { }

  get isSelf() {
    const claims:any = this.authService.getIdentityClaims();
    return claims && claims.user_id === this.uuid;
  }

  timeConverter(unix_timestamp: number, format: string){
    if (unix_timestamp == 0) return '';
    return unix(unix_timestamp/1000).format(format);
  }
}
