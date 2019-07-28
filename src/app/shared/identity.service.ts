import {Injectable} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class IdentityService {
  protected baseUrl = environment.baseAPIURL;

  constructor(private http: HttpClient, private authService: OAuthService) {}

  private getIdentity() {
    return this.http.get(new URL('identity', this.baseUrl).toString(), this.getRequestOptions());
  }

  getPermissions(): Observable<string> {
    return new Observable((observer) => {
      let session = sessionStorage.getItem("permissions");
      if (session) {
        observer.next(session);
        return;
      }
      this.getIdentity().subscribe((data: any[]) => {
        if (!data) observer.error(new Error('No Data Returned'));
        let permissions = data.find(x => x.type === 'permissions');
        if (!permissions) observer.error(new Error('Cannot find permissions claim'));
        if (!permissions.value) observer.error(new Error('Cannot find permissions claim value'));
        sessionStorage.setItem('permissions', permissions.value);
        observer.next(permissions.value);
      }, error => observer.error(error));
    });
  }

  checkPermission(permission): Observable<boolean> {
    return new Observable((observer) => {
      this.getPermissions().subscribe(permissions => {
        observer.next(permissions.includes(permission));
      }, error => {
        observer.next(false);
      })
    })
  }

  checkPermissions(permissionList:string[]): Observable<boolean> {
    return new Observable((observer) => {
      this.getPermissions().subscribe(permissions => {
        observer.next(permissionList.some(e => permissions.includes(e)));
      }, error => {
        observer.next(false);
      })
    })
  }

  private getRequestOptions() {
    return { headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.authService.getAccessToken()}`
      })};
  }
}
