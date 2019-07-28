import {Injectable} from '@angular/core';

import {BaseService} from '../base.service';
import {Rank} from "../models/api/plugins/moderation/rank";
import {OAuthService} from "angular-oauth2-oidc";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RankService extends BaseService<Rank> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "plugins/moderation/ranks");
  }
}
