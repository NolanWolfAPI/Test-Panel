import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../../../services/player.service';
import {Player} from '../../../models/api/player';
import {RankService} from '../../../services/rank.service';
import {Rank} from '../../../models/api/plugins/moderation/rank';
import {Staff} from '../../../models/core/staff';
import {StaffService} from '../../../services/staff.service';
import {LoadingState} from '../../../models/shared/loading-state';
import {Role} from '../../../models/core/role';
import {RoleService} from '../../../services/role.service';
import {forkJoin} from "rxjs";

@Component ({
  selector: 'staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {
  rows: any[] = [];

  staff: Staff[] = [];
  players: Player[] = [];
  ranks: Rank[] = [];
  roles: Role[] = [];

  loading: LoadingState = new LoadingState;

  showInActive: boolean = false;

  searchQuery = '';

  total = 100;
  pageNumber = 1;

  constructor(private staffService: StaffService,
              private playerService: PlayerService,
              private roleService: RoleService,
              private rankService: RankService) {
    this.toggle = this.toggle.bind(this);
  }

  ngOnInit() {
    this.getStaff();
  }

  getStaff() {
    forkJoin(
      this.showInActive ? this.staffService.getAll(this.pageNumber) : this.staffService.getActive(this.pageNumber),
      this.showInActive ? this.staffService.getAllCount() : this.staffService.getActiveCount(),
    ).subscribe(results => {
      this.staff = results[0];
      this.total = Number.parseInt(results[1]);
    }, () => this.loading.setFailed('Something when wrong'),
      () => {
        this.getRoles();
        this.getPlayers();
      });

    // this.staffService.getAll().subscribe(data => {
    //     this.staff = data
    //   },
    //   () => {
    //     this.loading.setFailed('Something when wrong');
    //   },
    //   () => {
    //     this.getRoles();
    //     this.getPlayers();
    // });
  }

  getRoles() {
    const ids = this.staff.map(x => x.role_id);
    this.roleService.getByIds(ids).subscribe(data => {
        this.roles = data
      },
      () => {
        this.loading.setFailed('Something when wrong');
      },
      () => {
      });
  }

  getPlayers() {
    const ids = this.staff.map(x => x.user_id);
    this.playerService.getByIds(ids).subscribe(data => {
        this.players = data
      },
      () => {
        this.loading.setFailed('Something when wrong');
      },
      () => {
        this.getRanks();
      });
  }

  getRanks() {
    const ids = this.players.map(x => x.rank_id);
    this.rankService.getByIds(ids).subscribe(data => {
        this.ranks = data
      },
      () => {
        this.loading.setFailed('Something when wrong');
      },
      () => {
        this.generateStaffList();
      });
  }

  search() {
    this.pageNumber = 1;
    if (this.searchQuery.length === 0) {
      this.ngOnInit();
      return;
    }
    forkJoin(
      this.staffService.search(this.searchQuery, this.pageNumber),
      this.staffService.searchCount(this.searchQuery),
    ).subscribe(results => {
        this.staff = results[0];
        this.total = Number.parseInt(results[1]);
      }, () => this.loading.setFailed('Something when wrong'),
      () => {
        this.getRoles();
        this.getPlayers();
      });
  }

  generateStaffList() {
    this.rows = [];
    this.staff.forEach(staff => {
      const row: any = {};
      row.staff = staff;
      if (typeof row.staff !== 'undefined') {
        row.role = this.roles.find(x => x.id == staff.role_id);
        row.player = this.players.find(x => x.id == staff.user_id);
        if (typeof row.player !== 'undefined') row.rank = this.ranks.find(x => x.id == row.player.rank_id);
      }
      this.rows.push(row);
    });
    this.loading.setSuccessful();
  }

  pageChanged(event) {
    this.pageNumber = event;
    this.ngOnInit();
  }

  toggle() {
    this.pageChanged(1);
  }
}
