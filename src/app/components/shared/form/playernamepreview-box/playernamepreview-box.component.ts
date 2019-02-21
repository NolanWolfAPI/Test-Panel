import {Component, Input, OnChanges} from "@angular/core";

@Component ({
  selector: "playernamepreview-box",
  templateUrl: "./playernamepreview-box.component.html",
  styleUrls: ["./playernamepreview-box.component.scss"],
})
export class PlayerNamePreviewBoxComponent implements OnChanges{

  @Input() label:string = "";

  @Input() playerName:string = "Player";

  @Input() prefix:string = "";

  @Input() suffix:string = "";

  display = '';



  get innerPrefix() {
    return this.prefix ? this.prefix : '';
  }

  get innerSuffix() {
    return this.suffix ? this.suffix : '';
  }

  ngOnChanges(): void {
    let text = (this.innerPrefix+this.playerName+this.innerSuffix);
    this.display = this.parseText(text);

  }

  parseText(text:string) {
    let bodyStart= '';
    let bodyEnd= '';
    let parts = text.split('&');
    for (let part of parts) {
      if (part.length == 0) continue;
      switch (part[0]) {
        case 'r':
          bodyStart += bodyEnd;
          bodyEnd = '';
          break;
        default:
          bodyStart += `<span class=\"mc-${part[0]}\">`;
          if (part.length > 1) {
            bodyStart += part.slice(1)
          }

          bodyEnd += '</span>';
      }
    }
    return bodyStart+bodyEnd;
  }
}
