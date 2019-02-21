import {Injectable} from '@angular/core';

import {BaseService} from './base.service';
import {OAuthService} from "angular-oauth2-oidc";
import {Role} from "../models/core/role";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "roles");
  }

  search(query:string) {
    return this.getRequest(`${this.endpointURL}/search?query=${query}`);
  }

  searchCount(query:string) {
    return this.getRequest(`${this.endpointURL}/search/count?query=${query}`);
  }
}
