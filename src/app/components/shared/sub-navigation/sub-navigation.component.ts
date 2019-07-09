import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

declare let M;

@Component ({
  selector: 'sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.scss'],
})
export class SubNavigationComponent implements OnInit {

  @Output() selectCategory: EventEmitter<string> = new EventEmitter<string>(true);

  @Input() pageTitle:string = '';

  @Input() selectedCategory: string;

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

  openCategory(parameter) {
    this.selectCategory.emit(parameter);
  }

  isCurrent(value) {
    return value === this.selectedCategory;
  }

  clearSession(event) {
    sessionStorage.removeItem('permissions');
  }
}
