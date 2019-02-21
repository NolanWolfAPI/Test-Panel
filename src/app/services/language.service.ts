import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {Language} from '../models/api/plugins/translations/language';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LanguageService extends BaseService<Language> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, 'plugins/translations/languages');
  }
}
