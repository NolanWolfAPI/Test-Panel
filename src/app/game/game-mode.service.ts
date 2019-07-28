import {Injectable} from '@angular/core';

import {BaseService} from '../base.service';
import {UUID} from "angular2-uuid";
import {Observable} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";
import {GameMode} from "../models/api/game-mode";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GameModeService extends BaseService<GameMode> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http,authService, "games/modes");
  }

  getByGameId(id:UUID) : Observable<any> {
    return this.getRequest(`games/${id.toString()}/modes`);
  }

  getCountByGameId(id:UUID) : Observable<any> {
    return this.getRequest(`games/${id.toString()}/modes/count`);
  }
}
