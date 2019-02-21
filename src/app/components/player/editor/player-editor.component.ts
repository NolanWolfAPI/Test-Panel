import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PlayerService} from '../../../services/player.service';
import {Player} from '../../../models/api/player';
import {UUID} from 'angular2-uuid';
import {ActivatedRoute, Router} from '@angular/router';
import {RankService} from '../../../services/rank.service';
import {Rank} from '../../../models/api/plugins/moderation/rank';
import {APIResult} from '../../../models/shared/result';
import {Currency} from "../../../models/api/plugins/currency/currency";
import {CurrencyService} from "../../../services/currency.service";
import {forkJoin} from "rxjs";

declare let M: any;

@Component ({
  selector: 'player-editor',
  templateUrl: './player-editor.component.html',
  styleUrls: ['./player-editor.component.scss'],
})
export class PlayerEditorComponent implements OnInit {

  @Input()
  id: UUID = null;
  player: Player = new Player();
  ranks: Rank[] = [];
  currencies: Currency[] = [];

  @ViewChild('tabs', {read: ElementRef}) tabsRefernce: ElementRef;

  constructor(private playerService: PlayerService,
              private rankService: RankService,
              private currencyService: CurrencyService,
              private route: ActivatedRoute,
              private router: Router) {
    this.getCurrencyName = this.getCurrencyName.bind(this);
  }

  ngOnInit() {
    M.Tabs.init(this.tabsRefernce.nativeElement);
    this.route.params.subscribe(params => {
      if (params['id'] !== 'undefined') {
        this.id = params['id'];
        if (this.id)
          this.getPlayer(this.id);
      }
    });

    forkJoin(
      this.rankService.getAll(),
      this.currencyService.getAll()
    ).subscribe((results) => {
      this.ranks = results[0];
      this.currencies = results[1];
    });
  }

  getPlayer(id: UUID) {
    this.playerService.get(id).subscribe(
      next => {
        this.player = next;
      },
      error => {
        console.log('Player request failed');
      },
      () => {

      }
    )
  }

  get rank() {
    return this.ranks.find(x => x.id === this.player.rank_id);
  }

  get balances() {
    return Object.keys(this.player.balances).map(key => ({key: key, value: this.player.balances[key]}))
  }

  set balances(items:{key:UUID, value:number}[]) {
    this.player.balances = new Map(items.map((i):[UUID,number] => [i.key,i.value]));
  }

  getCurrencyName(id:UUID) {
    return (this.currencies ? this.currencies : []).length > 0 ? this.currencies.find(x => x.id === id).name : id.toString();
  }

  get vanityitems() {
    return Object.keys(this.player.vanityitems).map(key => ({key: key, value: this.player.vanityitems[key]}));
  }

  get preferences() {
    return Object.keys(this.player.preferences).map(key => ({key: key, value: this.player.preferences[key]}));
  }

  save() {
    if (this.player.language === '') this.player.language = null;
    this.playerService.put(this.player.uuid, this.player).subscribe(x => {
      const result = x as APIResult;
      if (result.replaced > 0 ) {
        M.toast({html: 'Saved'}, 4000);
        this.router.navigateByUrl(`/players/${this.player.uuid}/edit`);
      } else if ( result.unchanged > 0){
        M.toast({html: 'No changes To Save'}, 4000);
      }
      else M.toast({html: 'Something when wrong'}, 4000);
    });
  }

  financeNewDropDownOptions() {
    return this.currencies.map(x => ({key:x.name, value:x.id}))
  }
}
