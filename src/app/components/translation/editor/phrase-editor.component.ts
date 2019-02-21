import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {Phrase} from '../../../models/api/plugins/translations/phrase';
import {PhraseService} from '../../../services/phrase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {APIResult} from '../../../models/shared/result';

declare let M: any;

@Component ({
  selector: 'phrase-editor',
  templateUrl: './phrase-editor.component.html',
  styleUrls: ['./phrase-editor.component.scss']
})
export class PhraseEditorComponent implements OnInit {
  @Input()
  id: UUID = null;

  flatternedTranslations: {key, value}[] = [];
  newTranslations: {key, value}[] = [];

  phrase: Phrase = new Phrase();

  constructor(private phraseService: PhraseService,
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
    this.phraseService.get(id).subscribe(
      next => {
        this.phrase = next;
        this.flatternedTranslations = Object.keys(this.phrase.translations).map(key => ({key: key, value: this.phrase.translations[key]}));
      },
      error => {
        console.log('Staff request failed');
      },
      () => {

      }
    )
  }

  removeRow(key) {
    this.flatternedTranslations = this.flatternedTranslations.filter(x => x.key !== key);
  }

  removeNewRow(key) {
    this.newTranslations = this.newTranslations.filter(x => x.key !== key);
  }

  addRow(event) {
    this.newTranslations.push({key: 'temp', value: 'temp'});
    event.preventDefault();
  }

  get isCreate(): boolean {
    return this.phrase && typeof this.phrase.id === 'undefined';
  }

  save() {
    const gatheredTranslations = Array.from(new Set(this.newTranslations.concat(this.flatternedTranslations)));
    const translations: any = gatheredTranslations.reduce((acc, val) => {
      acc[val.key] = val.value;
      return acc;
    }, {});
    this.phrase.translations = translations;
    this.phrase.name = this.phrase.name.toLowerCase();
    if (this.isCreate) {
      this.phraseService.post(this.phrase).subscribe(x => {
        const result = x as APIResult;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/translations`);
        } else { M.toast({html: 'Something when wrong'}, 4000); }
      });
    } else {
      this.phraseService.put(this.phrase.id, this.phrase).subscribe(x => {
        const result = x as APIResult;
        if (result.replaced > 0 || result.unchanged > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/translations`);
        } else { M.toast({html: 'Something when wrong'}, 4000); }
      });
    }
  }
}
