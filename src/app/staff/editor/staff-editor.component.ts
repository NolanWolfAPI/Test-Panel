import {Component, Input, OnInit} from '@angular/core';
import {PlayerService} from '../../player/player.service';
import {Player} from '../../models/api/player';
import {UUID} from 'angular2-uuid';
import {ActivatedRoute, Router} from '@angular/router';
import {RankService} from '../../rank/rank.service';
import {Rank} from '../../models/api/plugins/moderation/rank';
import {StaffService} from '../staff.service';
import {Staff} from '../../models/core/staff';
import {APIResult} from '../../models/shared/result';
import {forkJoin} from "rxjs";

declare let M: any;

@Component ({
  selector: 'staff-editor',
  templateUrl: './staff-editor.component.html',
  styleUrls: ['./staff-editor.component.scss'],
})
export class StaffEditorComponent implements OnInit {

  @Input()
  id: UUID = null;

  staff: Staff = new Staff();
  players: Player[] = [];
  ranks: Rank[] = [];

  constructor(private staffService: StaffService,
              private playerService: PlayerService,
              private rankService: RankService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== 'undefined') {
        this.id = params['id'];
        if (this.id)
        this.getStaff(this.id);
      }
    });

    forkJoin(
      this.playerService.getAll(),
      this.rankService.getAll()
    ).subscribe((results) => {
      this.players = results[0];
      this.ranks = results[1];
      this.generateDropdowns();
    })
  }

  getStaff(id: UUID) {
    this.staffService.get(id).subscribe(
      next => {
        this.staff = next;
      },
      error => {
        console.log('Staff request failed');
      },
      () => {

      }
    )
  }

  get player() {
    return this.players.find(x => x.id == this.staff.user_id);
  }

  get rank() {
    return this.ranks.find(x => x.id === this.player.rank_id);
  }

  get isCreate(): boolean{
    return typeof this.id === 'undefined';
  }

  generateDropdowns() {

  }

  save() {
    if (this.isCreate)
      this.staffService.post(this.staff).subscribe(x => {
        const result = x as APIResult;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/staff/${result.generated_keys[0]}/edit`);
        } else M.toast({html: 'Something when wrong'}, 4000);
      });
    else
      this.staffService.put(this.staff.id, this.staff).subscribe(x => {
        const result = x as APIResult;
        if (result.replaced > 0) M.toast({html: 'Saved'}, 4000);
        else if (result.unchanged > 0) M.toast({html: 'No changes found'}, 4000);
        else M.toast({html: 'Something when wrong'}, 4000);
      });
  }
}
