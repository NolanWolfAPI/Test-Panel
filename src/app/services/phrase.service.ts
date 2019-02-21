import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Phrase} from '../models/api/plugins/translations/phrase';
import {OAuthService} from 'angular-oauth2-oidc';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PhraseService extends BaseService<Phrase> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, 'plugins/translations/phrases');
  }

  search(query: string, pageNumber: number = 1, pageSize: number = 100) {
    return this.getRequest(`${this.endpointURL}/search?query=${query}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}
