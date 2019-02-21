export class NavLink {
  public expanded: boolean = false;

  constructor(public path:string = null, public name:string, public icon:string, public children: NavLink[] = [], public permissionCheck:string = ''){}
}
