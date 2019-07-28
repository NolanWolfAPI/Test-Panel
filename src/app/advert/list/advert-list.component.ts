import {Component, OnInit} from '@angular/core';
import {LoadingState} from '../../models/shared/loading-state';
import {AdvertService} from "../advert.service";
import {Advert} from "../../models/api/plugins/adverts/advert";
import {UUID} from "angular2-uuid";
import {APIResult} from "../../models/shared/result";

declare let M:any;

@Component ({
  selector: 'advert-list',
  templateUrl: './advert-list.component.html',
  styleUrls: ['./advert-list.component.scss'],
})
export class AdvertListComponent implements OnInit {
  rows: any[] = [];

  adverts: Advert[] = [];

  loading: LoadingState = new LoadingState;

  constructor(private advertService: AdvertService) {}

  ngOnInit() {
    this.getAdverts();
  }

  getAdverts() {
    this.advertService.getAll().subscribe(data => {
        this.adverts = data;
      },
      () => {
        this.loading.setFailed('Something when wrong');
      },
      () => {
        this.generateRows();
    });
  }

  generateRows() {
    this.rows = this.adverts.map(advert => {
      return {advert:advert};
    });
    this.loading.setSuccessful();
  }

  delete(event, id:UUID) {
    event.stopPropagation();
    if (!confirm("This will delete this item permanently. Are you sure you want to do this?")) return;
    this.advertService.delete(id).subscribe(data => {
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
