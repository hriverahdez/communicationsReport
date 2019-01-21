import { Component, OnInit } from '@angular/core';
import { APP_MENU } from './_navigation';

declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.component.html'
})
export class SidebarComponent implements OnInit {
	public menuItems: any[];

	ngOnInit() {
		this.menuItems = APP_MENU.filter(menuItem => menuItem);
	}

	get isNotMobileMenu() {
		return window.innerWidth > 991 ? false : true;
		// if($(window).width() > 991){
		//     return false;
		// }
		// return true;
	}
}
