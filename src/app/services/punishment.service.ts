import {Injectable} from '@angular/core';

import {BaseService} from './base.service';
import {OAuthService} from "angular-oauth2-oidc";
import {Punishment} from "../models/api/plugins/moderation/punishment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PunishmentService extends BaseService<Punishment> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "plugins/moderation/punishments");
  }
}
