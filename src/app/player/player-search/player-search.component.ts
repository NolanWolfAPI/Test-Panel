import {Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ReducedPlayerService} from "../player.reduced.service";
import {ReducedPlayer} from "../../models/api/reducedplayer";

declare let M: any;

export const PLAYER_SEARCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PlayerSearchComponent),
  multi: true
};

@Component ({
  selector: 'player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.scss'],
  providers: [PLAYER_SEARCH_CONTROL_VALUE_ACCESSOR]
})
export class PlayerSearchComponent implements ControlValueAccessor, OnChanges {
  @Input() validate = false;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() label = '';
  @Input() id: UUID = UUID.UUID();
  @Input() onChange: Function = (e) => this.onChangeCallback(this.value);

  innerValue:UUID;
  displayValue:string = "";

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};


  players: ReducedPlayer[] = [];
  instance: any = null;
  @ViewChild('search', {read: ElementRef}) boxRefernce: ElementRef;

  @Output() selected = new EventEmitter();

  constructor(private playerService: ReducedPlayerService) {
    this.onAutoComplete = this.onAutoComplete.bind(this);
  }

  ngOnChanges() {
    M.Autocomplete.init(this.boxRefernce.nativeElement, {data: []});
    this.instance = M.Autocomplete.getInstance(this.boxRefernce.nativeElement);
    if (this.active) {
      this.playerService.get(this.innerValue).subscribe(
        data => {
          const player = data;
          if (!player) {
            console.error('No Player Found');
            return;
          }
          const item = {[player.displayName]: `https://crafatar.com/avatars/${player.uuid}?overlay`};
          this.players = [player];
          this.instance.updateData(item);
          this.instance.selectOption({text:() => player.displayName});
        },
        error => {
          this.players = [];
          console.error(error);
        })
    }
  }

  keyPress(event) {
    if (event.key === 'Enter') event.preventDefault();
    const value = this.boxRefernce.nativeElement.value;
    if (!value || value.length < 3) return;
    this.playerService.search(value, 1, 25).subscribe(
      data => {
        this.players = data;
      },
      error => {
        this.players = [];
        console.error(error);
      }, () => {
        const instance = M.Autocomplete.getInstance(event.target);
        const data = this.players.reduce((acc, val) => {
          acc[(val.displayName)] = `https://crafatar.com/avatars/${val.id}?overlay`;
          return acc;
        }, {});
        instance.updateData(data);
        instance.open();
      }
    );
  }

  onAutoComplete(value) {
    const player = this.players.find(x => x.displayName === value);
    this.innerValue = player ? player.uuid : null;
    this.displayValue = value;
    this.onChangeCallback(this.innerValue);
  }

  writeCallback(data) {
    M.Autocomplete.init(this.boxRefernce.nativeElement, {data: [], onAutocomplete:this.onAutoComplete});
  }

  get active() {
    return this.innerValue;
  }

  get value(): any {
    return this.displayValue
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      if (v) this.playerService.get(this.innerValue).subscribe(
        data => {
          const player = data;
          if (!player) {
            console.error('No Player Found');
            return;
          }
          const item = {[player.displayName]: `https://crafatar.com/avatars/${player.uuid}?overlay`};
          this.players = [player];
          this.instance.updateData(item);
          this.displayValue = player.displayName;
        },
        error => {
          this.players = [];
          console.error(error);
        });
      this.writeCallback(v);
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
      if (value) this.playerService.get(this.innerValue).subscribe(
        data => {
          const player = data;
          if (!player) {
            console.error('No Player Found');
            return;
          }
          const item = {[player.displayName]: `https://crafatar.com/avatars/${player.uuid}?overlay`};
          this.players = [player];
          this.instance.updateData(item);
          this.displayValue = player.displayName;
        },
        error => {
          this.players = [];
          console.error(error);
        });
    }
    this.writeCallback(value);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
