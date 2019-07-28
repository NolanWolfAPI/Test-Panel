import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {ActivatedRoute, Router} from '@angular/router';
import {APIResult} from '../../models/shared/result';
import {Punishment, PunishmentAction} from "../../models/api/plugins/moderation/punishment";
import {PunishmentService} from "../punishment.service";

declare let M: any;

@Component ({
  selector: 'punishment-editor',
  templateUrl: './punishment-editor.component.html',
  styleUrls: ['./punishment-editor.component.scss']
})
export class PunishmentEditorComponent implements OnInit {
  @Input()
  id: UUID = null;

  punishmentActions: PunishmentAction[] = [];

  punishment: Punishment = new Punishment();

  constructor(private punishmentService: PunishmentService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] !== 'undefined') {
        this.id = params['id'];
        if (this.id) this.getPhrase(this.id)
      }
    });
  }

  getPhrase(id: UUID) {
    this.punishmentService.get(id).subscribe(
      next => {
        this.punishment = next;
        this.punishmentActions = this.punishment.repeat_actions;
      },
      error => {
        console.log('Staff request failed');
      },
      () => {

      }
    )
  }

  removeRow(key) {
    let actions = this.punishmentActions.filter(x => x.order !== key);
    let count = 0;
    this.punishmentActions = actions.map(x => {
      x.order = count;
      count++;
      return x;
    });
  }

  addRow(event) {
    event.preventDefault();
    let item = new PunishmentAction();
    item.order = this.punishmentActions.length;
    this.punishmentActions.push(item);
  }

  get isCreate(): boolean {
    return typeof this.punishment.id === 'undefined';
  }

  get pActions(): any[] {
    return [
      {'name': 'Warn', value: 0},
      {'name': 'Kick', value: 1},
      {'name': 'Mute', value: 2},
      {'name': 'Temporary Ban', value: 3},
      {'name': 'Permanently Ban', value: 4}
    ];
  }

  get timeunits(): any[] {
    return [
      {'name': 'Seconds', value: 0},
      {'name': 'Minutes', value: 1},
      {'name': 'Hours', value: 2},
      {'name': 'Days', value: 3},
      {'name': 'Weeks', value: 4},
      {'name': 'Months', value: 5},
      {'name': 'Years', value: 6},
    ];
  }

  requireDuration(action) {
    return [0,1,4].includes(Number(action));
  }

  save() {
    this.punishment.repeat_actions = this.punishmentActions;
    if (this.isCreate) {
      this.punishmentService.post(this.punishment).subscribe(x => {
        const result = x as APIResult;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/punishments/${result.generated_keys[0]}`);
        } else { M.toast({html: 'Something when wrong'}, 4000); }
      });
    } else {
      this.punishmentService.put(this.punishment.id, this.punishment).subscribe(x => {
        const result = x as APIResult;
        if (result.replaced > 0 || result.unchanged > 0) { M.toast({html: 'Saved'}, 4000);
        } else { M.toast({html: 'Something when wrong'}, 4000); }
      });
    }
  }
}
