import { Component, OnInit } from '@angular/core';
import { APP_MENU, MenuItem } from './_navigation';

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.component.html'
})
export class SidebarComponent implements OnInit {
	public menuItems: MenuItem[];

	ngOnInit() {
		this.menuItems = APP_MENU.filter(menuItem => menuItem);
	}

	get isNotMobileMenu() {
		return window.innerWidth > 991 ? false : true;
	}
}
