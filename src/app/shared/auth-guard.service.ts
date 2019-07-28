import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {IdentityService} from "./identity.service";
import {Observable, of} from "rxjs";

declare let M;

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: OAuthService, private identityService:IdentityService, private route: ActivatedRoute, private router: Router) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (childRoute.data.hasOwnProperty('public') && childRoute.data.public) return true;

    if (this.isLoggedIn())
      return this.checkRoutePermission(childRoute);
    else {
      this.authService.initImplicitFlow();
      M.toast({html: 'You don\'t have permission to access this'}, 4000);
      return of(false);
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.data.hasOwnProperty('public') && route.data.public) return true;

    if (this.isLoggedIn())
      return this.checkRoutePermission(route.children[0]);
    else {
      this.authService.initImplicitFlow();
      M.toast({html: 'You don\'t have permission to access this'}, 4000);
      return of(false);
    }
  }

  isLoggedIn(): boolean {
    return this.authService.hasValidAccessToken();// && this.authService.hasValidIdToken();
  }

  checkRoutePermission(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (!route.data.hasOwnProperty('permission')) return of(true);
    return this.identityService.checkPermission(route.data.permission);
  }
}
