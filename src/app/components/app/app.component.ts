import {Component} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = environment.title;

  constructor(private oauthService: OAuthService, private router: Router) {
    let baseUrl: string = environment.baseAuthURL;

    this.oauthService.configure({
      requireHttps: false,
      issuer: baseUrl,
      loginUrl: `${baseUrl}/connect/authorize`,
      redirectUri: window.location.origin,
      silentRefreshRedirectUri: `${window.location.origin}/silent-refresh.html`,
      clientId: 'panel',
      scope: 'openid profile api staff.profile',
      oidc: true,
      logoutUrl: `${baseUrl}/connect/endsession?id_token={{id_token}}`
    })

    
    this.oauthService.setStorage(sessionStorage);

    this.oauthService.setupAutomaticSilentRefresh();

    //this.oauthService.loadDiscoveryDocument().then(() => {

      // This method just tries to parse the token(s) within the url when
      // the auth-server redirects the user back to the web-app
      // It doesn't send the user the the login page
    if (!sessionStorage.getItem('path')) sessionStorage.setItem('path', window.location.pathname)

    this.oauthService.tryLogin({})
    //   .then(_ => {
    //   const path = sessionStorage.getItem('path');
    //   sessionStorage.removeItem('path');
    //
    //   console.log(path)
    //   this.router.navigateByUrl(path);
    // });
    //});

    this.oauthService.events.subscribe(e => {
      if (e.type === 'session_terminated') sessionStorage.clear();
    });
  }
}
