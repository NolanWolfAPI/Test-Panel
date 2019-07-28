import {Injectable} from '@angular/core';

import {BaseService} from '../base.service';
import {OAuthService} from "angular-oauth2-oidc";
import {ChatFilterExpression} from "../models/api/plugins/moderation/chat-filter-expression";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ChatFilterService extends BaseService<ChatFilterExpression> {
  constructor(http: HttpClient, authService: OAuthService) {
    super(http, authService, "plugins/moderation/chatfilterexpressions");
  }
}
