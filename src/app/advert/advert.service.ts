import {Injectable} from '@angular/core';

import {BaseService} from '../base.service';
import {OAuthService} from "angular-oauth2-oidc";
import {Advert} from "../models/api/plugins/adverts/advert";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AdvertService extends BaseService<Advert> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "plugins/adverts");
  }
}
