import {Component, OnInit} from '@angular/core';
import {PhraseService} from '../phrase.service';
import {Phrase} from '../../models/api/plugins/translations/phrase';
import {UUID} from "angular2-uuid";
import {APIResult} from "../../models/shared/result";
import {forkJoin} from "rxjs";

declare let M:any;

@Component ({
  selector: 'phrase-list',
  templateUrl: './phrase-list.component.html',
  styleUrls: ['./phrase-list.component.scss'],
})
export class PhraseListComponent implements OnInit {
  rows: any[] = [];

  phrases: Phrase[] = [];

  total = 100;
  pageNumber = 1;

  searchQuery = '';

  constructor(private phraseService: PhraseService) {}

  ngOnInit(): void {
    forkJoin(
      this.searchQuery.length > 0 ? this.phraseService.search(this.searchQuery, this.pageNumber) : this.phraseService.getAll(this.pageNumber),
      this.phraseService.getAllCount()
    ).subscribe((results) => {
      this.phrases = results[0];
      this.generatePhraseList();
    })
  }

  search() {
    return this.phraseService.search(this.searchQuery).subscribe(
      next => {
        this.phrases = next;
      },
      error => {
        console.log('Phrase search failed: ' + error.toString());
      },
      () => this.generatePhraseList()
    )
  }

  generatePhraseList() {
    this.rows = [];
    this.phrases.forEach(phrase => {
      const row: any = {};
      row.phrase = phrase;
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
    this.phraseService.delete(id).subscribe(data => {
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
