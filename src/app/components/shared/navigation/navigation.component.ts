import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavLink} from 'app/models/shared/nav-link';

@Component ({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {

  @Output() pageChange = new EventEmitter();

  @Input() selectedCategory: string;

  links: NavLink[] = [
    new NavLink(null, 'Dashboard', 'dashboard', [
      new NavLink('/', 'Dashboard', 'b', null),
    ]),
    new NavLink(null, 'People', 'people', [
      new NavLink('/players', 'Players', 'b', null, 'players.list'),
      new NavLink('/staff', 'Staff', 'b', null, 'staff.list'),
      new NavLink('/ranks', 'Ranks', 'b', null, 'ranks.list'),
      new NavLink('/roles', 'Staff Roles', 'b', null, 'roles.list'),
    ]),

    new NavLink(null, 'Games', 'games', [
      new NavLink('/games', 'Games', 'b', null, 'players.list'),
      //new NavLink('/games/analytics', 'Game Analytics', 'b'),
    ]),

    new NavLink(null, 'Moderation', 'gavel', [
      new NavLink('/cases', 'Cases', 'b', null, 'case.list'),
      new NavLink("/punishments", "Punishments", "b", null, 'punishment.list'),
    ]),

    new NavLink(null, 'Network Settings', 'settings', [
        // new NavLink(null, "Langauge Settings", "credit_card", [
        // new NavLink("/languages", "Languages", "format_paint"),
      new NavLink('/chatfilters', 'Chat Filter Expressions', 'b', null, 'chatfilters.list'),
      new NavLink('/languages', 'Languages', 'b', null, 'languages.list'),

      new NavLink('/translations', 'Translations', 'b', null, 'phrase.list'),
      //]),
      new NavLink('/vanities', 'Vanity', 'b', null, 'vanities.list'),
      new NavLink('/customapiconfigs', 'Custom Api Configs', 'b', null, 'customapiconfigs.list'),
        // new NavLink(null, 'Cosmetics Settings', 'credit_card', [
        //
        //   //new NavLink('/badges', 'Badges', 'b'),
        // ]),

      /*new NavLink(null, "Network Configs", "settings", [
        new NavLink("/hubconfigs", "Hub Configs", "settings"),
        new NavLink("/globalvariables", "Global Variables", "accessibility"),
      ]),*/
    ]),

    /*new NavLink(null, "Financial", "note", [
      new NavLink("/currencies", "Currencies", "format_paint"),
      new NavLink("/transactions", "Transactions", "format_paint"),
    ]),*/

    new NavLink(null, "Advertising", "flag", [
      new NavLink("/adverts", "Adverts", "b", null, 'adverts.list'),
      //new NavLink("/bitmaps", "Bitmap", "format_paint"),
    ]),

    // new NavLink(null, "Support", "note", [
    //   //new NavLink("/reports", "Reports", "b"),
    //
    // ]),
  ];

  expanded: boolean;

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  get _links() {
    // this.click(this.links.filter(p => p.name === this.selectedCategory)[0]);
    return this.links.filter(p => p.name === this.selectedCategory);
  }

  pageChanged(event){
    this.pageChange.emit(event)
  }

  linkClicked(link:NavLink) {
    this.pageChange.emit(link.name);
  }

  click(link:NavLink) {
    this.links.forEach(l => {
      l.expanded = l.name === link.name ? !link.expanded : false;
    })
  }
}
