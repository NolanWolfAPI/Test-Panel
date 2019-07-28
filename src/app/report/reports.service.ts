import {Injectable} from '@angular/core';

import {BaseService} from '../base.service';
import {Report} from "../models/api/plugins/moderation/report";
import {OAuthService} from "angular-oauth2-oidc";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ReportService extends BaseService<Report> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "plugins/moderation/reports");
  }
}
