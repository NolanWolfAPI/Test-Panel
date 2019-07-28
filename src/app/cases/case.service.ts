import {Injectable} from '@angular/core';

import {BaseService} from '../base.service';
import {OAuthService} from "angular-oauth2-oidc";
import {Case} from "../models/api/plugins/moderation/case";
import {Observable} from "rxjs";
import {UUID} from "angular2-uuid";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CaseService extends BaseService<Case> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "plugins/moderation/cases");
  }

  getActive(pageNumber: number = 1, pageSize: number = 100): Observable<any> {
    return this.getRequest(`${this.endpointURL}/active?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getActiveCount(): Observable<any> {
    return this.getRequest(`${this.endpointURL}/active/count`);
  }

  getWhereJudgementee(id: UUID, pageNumber: number = 1, pageSize: number = 100): Observable<any> {
    if (!id) throw new Error('Id cannot be null');
    return this.getRequest(`${this.endpointURL}/judgementee/${id.toString()}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getWhereJudgementeeCount(id: UUID): Observable<any> {
    if (!id) throw new Error('Id cannot be null');
    return this.getRequest(`${this.endpointURL}/judgementee/${id.toString()}/count`);
  }
}
