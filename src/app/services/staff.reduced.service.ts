import {Injectable} from '@angular/core';

import {BaseService} from './base.service';
import {OAuthService} from "angular-oauth2-oidc";
import {StaffPasswordReset} from "../models/core/staffresetpassword";
import {ReducedStaff} from "../models/core/reducedstaff";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class ReducedStaffService extends BaseService<ReducedStaff> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "reducedstaff");
  }

  getActive(pageNumber: number = 1, pageSize: number = 100): Observable<any> {
    return this.getRequest(`${this.endpointURL}/active?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getActiveCount(): Observable<any> {
    return this.getRequest(`${this.endpointURL}/active/count`);
  }

  search(query:string) {
    return this.getRequest(`${this.endpointURL}/search?query=${query}`);
  }

  searchCount(query:string) {
    return this.getRequest(`${this.endpointURL}/search/count?query=${query}`);
  }

  resetPassword(model: StaffPasswordReset) {
    return this.postRequest(`${this.endpointURL}/passwordreset`, JSON.stringify(model))
  }
}
