import {Injectable} from '@angular/core';

import {BaseService} from './base.service';
import {Player} from "../models/api/player";
import {OAuthService} from "angular-oauth2-oidc";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PlayerService extends BaseService<Player> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "users");
  }

  search(query:string, pageNumber: number = 1, pageSize:number = 100) {
    return this.getRequest(`${this.endpointURL}/search?query=${query}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  searchCount(query:string) {
    return this.getRequest(`${this.endpointURL}/search/count?query=${query}`);
  }
}
