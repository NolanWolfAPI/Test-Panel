import {Injectable} from '@angular/core';

import {BaseService} from '../base.service';
import {OAuthService} from "angular-oauth2-oidc";
import {Currency} from "../models/api/plugins/currency/currency";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CurrencyService extends BaseService<Currency> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "plugins/currency/currencies");
  }
}
