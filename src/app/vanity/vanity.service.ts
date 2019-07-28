import {Injectable} from '@angular/core';

import {BaseService} from '../base.service';
import {VanityItem} from "../models/api/plugins/vanity/vanity-item";
import {OAuthService} from "angular-oauth2-oidc";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class VanityService extends BaseService<VanityItem> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "plugins/vanity");
  }
}
