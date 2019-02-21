import {Injectable} from '@angular/core';

import {BaseService} from './base.service';
import {OAuthService} from "angular-oauth2-oidc";
import {Staff} from "../models/core/staff";
import {StaffPasswordReset} from "../models/core/staffresetpassword";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class StaffService extends BaseService<Staff> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "staff");
  }

  getActive(pageNumber: number = 1, pageSize: number = 100): Observable<any> {
    return this.getRequest(`${this.endpointURL}/active?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getActiveCount(): Observable<any> {
    return this.getRequest(`${this.endpointURL}/active/count`);
  }

  search(query:string, pageNumber: number = 1, pageSize: number = 100) {
    return this.getRequest(`${this.endpointURL}/search?query=${query}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  searchCount(query:string) {
    return this.getRequest(`${this.endpointURL}/search/count?query=${query}`);
  }

  resetPassword(model: StaffPasswordReset) {
    return this.postRequest(`${this.endpointURL}/passwordreset`, JSON.stringify(model))
  }
}
