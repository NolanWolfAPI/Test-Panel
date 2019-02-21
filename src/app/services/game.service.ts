import {Injectable} from '@angular/core';

import {BaseService} from './base.service';
import {Game} from "../models/api/game";
import {OAuthService} from "angular-oauth2-oidc";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GameService extends BaseService<Game> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "games");
  }
}
