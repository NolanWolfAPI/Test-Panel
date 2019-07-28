import {Component, OnInit} from '@angular/core';
import {Punishment} from "../../models/api/plugins/moderation/punishment";
import {PunishmentService} from "../punishment.service";
import {forkJoin} from "rxjs";

@Component ({
  selector: 'punishment-list',
  templateUrl: './punishment-list.component.html',
  styleUrls: ['./punishment-list.component.scss'],
})
export class PunishmentListComponent implements OnInit {
  rows: any[] = [];

  punishments: Punishment[] = [];

  total = 100;
  pageNumber = 1;

  searchQuery = '';

  constructor(private punishmentService: PunishmentService) {}

  ngOnInit(): void {
    forkJoin(
      this.punishmentService.getAll(this.pageNumber),
      this.punishmentService.getAllCount()
    ).subscribe((results) => {
      this.punishments = results[0];
      this.generateList();
    })
  }

  // search() {
  //   return this.punishmentService.search(this.searchQuery).subscribe(
  //     next => {
  //       this.punishments = next;
  //       console.log(this.punishments);
  //     },
  //     error => {
  //       console.log('Phrase search failed: ' + error.toString());
  //     },
  //     () => this.generateList()
  //   )
  // }

  generateList() {
    this.rows = [];
    this.punishments.forEach(item => {
      const row: any = {};
      row.item = item;
      this.rows.push(row);
    })
  }

  pageChanged(event) {
    this.pageNumber = event;
    this.ngOnInit();
  }
}
