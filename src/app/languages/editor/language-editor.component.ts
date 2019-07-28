import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {ActivatedRoute, Router} from '@angular/router';
import {APIResult} from '../../models/shared/result';
import {LanguageService} from "../language.service";
import {Language} from "../../models/api/plugins/translations/language";

declare let M: any;

@Component ({
  selector: 'language-editor',
  templateUrl: './language-editor.component.html',
  styleUrls: ['./language-editor.component.scss']
})
export class LanguageEditorComponent implements OnInit {
  @Input()
  id: UUID = null;

  language: Language = new Language();

  constructor(private languageService: LanguageService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] !== 'undefined') {
        this.id = params['id'];
        if (this.id) this.get(this.id)
      }
    });
  }

  get(id: UUID) {
    this.languageService.get(id).subscribe(
      next => {
        this.language = next;
      },
      error => {
        console.log('Staff request failed');
      },
      () => {

      }
    )
  }


  get isCreate(): boolean {
    return typeof this.id === 'undefined';
  }

  save() {
    if (this.isCreate) {
      this.languageService.post(this.language).subscribe(x => {
        const result = x as APIResult;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/punishments/${result.generated_keys[0]}`);
        } else { M.toast({html: 'Something when wrong'}, 4000); }
      });
    } else {
      this.languageService.put(this.language.id, this.language).subscribe(x => {
        const result = x as APIResult;
        if (result.replaced > 0 || result.unchanged > 0) { M.toast({html: 'Saved'}, 4000);
        } else { M.toast({html: 'Something when wrong'}, 4000); }
      });
    }
  }
}
