import {Injectable} from '@angular/core';

import {BaseService} from '../base.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {JudgementSession} from '../models/api/plugins/moderation/judgement-session';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class JudgementSessionService extends BaseService<JudgementSession> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, 'plugins/moderation/judgementsessions');
  }
}
