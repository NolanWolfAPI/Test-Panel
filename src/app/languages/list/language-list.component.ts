import {Component, OnInit} from '@angular/core';
import {Language} from "../../models/api/plugins/translations/language";
import {LanguageService} from "../language.service";
import {APIResult} from "../../models/shared/result";
import {UUID} from "angular2-uuid";
import {forkJoin} from "rxjs";

declare let M:any;

@Component ({
  selector: 'language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss'],
})
export class LanguageListComponent implements OnInit {
  rows: any[] = [];

  languages: Language[] = [];

  total = 100;
  pageNumber = 1;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    forkJoin(
      this.languageService.getAll(this.pageNumber),
      this.languageService.getAllCount()
    ).subscribe((results) => {
      this.languages = results[0];
      this.generateList();
    })
  }

  generateList() {
    this.rows = [];
    this.languages.forEach(item => {
      const row: any = {};
      row.item = item;
      this.rows.push(row);
    })
  }

  pageChanged(event) {
    this.pageNumber = event;
    this.ngOnInit();
  }

  delete(event, id:UUID) {
    event.stopPropagation();
    if (!confirm("This will delete this item permanently. Are you sure you want to do this?")) return;
    this.languageService.delete(id).subscribe(data => {
      const results:APIResult = data ;
      if (results.deleted > 0) {
        M.toast({html: 'Deleted'}, 4000);
        this.ngOnInit();
      } else {
        M.toast({html: 'Something when wrong'}, 4000);
      }
    });
  }
}
