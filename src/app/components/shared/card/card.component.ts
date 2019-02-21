import {Component, Input} from "@angular/core";
import {until} from "selenium-webdriver";

@Component ({
  selector: "card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent {
  @Input() displayTitle:boolean = false;

  constructor() { }
}
