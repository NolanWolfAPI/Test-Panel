import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {ActivatedRoute, Router} from '@angular/router';
import {APIResult} from '../../../models/shared/result';
import {AdvertService} from "../../../services/advert.service";
import {Advert} from "app/models/api/plugins/adverts/advert";

declare let M: any;

@Component ({
  selector: 'advert-editor',
  templateUrl: './advert-editor.component.html',
  styleUrls: ['./advert-editor.component.scss'],
})
export class AdvertEditorComponent implements OnInit {

  @Input()
  id: UUID = null;

  advert: Advert = new Advert();

  message = "";

  constructor(private advertService: AdvertService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== 'undefined') {
        this.id = params['id'];
        if (this.id)
        this.getAdvert(this.id);
      }
    });
  }

  getAdvert(id: UUID) {
    this.advertService.get(id).subscribe(
      next => {
        this.advert = next;
        this.message = this.advert.message.join('\n\r');
      },
      error => {
        console.log('request failed');
      },
      () => {

      }
    )
  }

  get isCreate(): boolean{
    return typeof this.id === 'undefined';
  }

  save() {
    this.advert.message = this.message.split('\n\r');
    if (this.isCreate)
      this.advertService.post(this.advert).subscribe(x => {
        const result = x as APIResult;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/adverts/${result.generated_keys[0]}/edit`);
        } else M.toast({html: 'Something when wrong'}, 4000);
      });
    else
      this.advertService.put(this.advert.id, this.advert).subscribe(x => {
        const result = x as APIResult;
        if (result.replaced > 0 || result.unchanged > 0) M.toast({html: 'Saved'}, 4000);
        else M.toast({html: 'Something when wrong'}, 4000);
      });
  }
}
