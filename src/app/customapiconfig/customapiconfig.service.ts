import {Injectable} from '@angular/core';

import {OAuthService} from "angular-oauth2-oidc";

import {BaseService} from '../base.service';
import {CustomApiConfig} from "app/models/core/customapiconfig";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CustomApiConfigService extends BaseService<CustomApiConfig> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "customapiconfigs");
  }
}
