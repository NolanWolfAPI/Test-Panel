import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

declare let M;

@Component ({
  selector: 'sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.scss'],
})
export class SubNavigationComponent implements OnInit {

  @Input() pageTitle:string = '';

  @ViewChild('dropdown', {read: ElementRef}) reference: ElementRef;

  constructor(private authService: OAuthService) { }

  ngOnInit(): void {
    M.Dropdown.init(this.reference.nativeElement)
  }

  public logoff() {
    this.clearSession(null);
    this.authService.logOut();
  }

  get staffId() {
    const claims:any = this.authService.getIdentityClaims();
    if (!claims) return null;
    return claims.id;
  }

  get mcId() {
    const claims:any = this.authService.getIdentityClaims();
    if (!claims) return null;
    return claims.user_id;
  }

  get name() {
    const claims:any = this.authService.getIdentityClaims();
    if (!claims) return null;
    return `${claims.given_name} ${claims.family_name}`;
  }

  clearSession(event) {
    sessionStorage.removeItem('permissions');
  }
}
