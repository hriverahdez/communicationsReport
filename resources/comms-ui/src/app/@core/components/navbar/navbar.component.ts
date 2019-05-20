import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { APP_MENU, MenuItem } from '../sidebar/_navigation';

@Component({
	moduleId: module.id,
	selector: 'navbar-cmp',
	templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
	private menuItems: MenuItem[];
	location: Location;
	private nativeElement: Node;
	private toggleButton;
	private sidebarVisible: boolean;

	@ViewChild('navbar-cmp') button;

	constructor(location: Location, private element: ElementRef) {
		this.location = location;
		this.nativeElement = element.nativeElement;
		this.sidebarVisible = false;
	}

	ngOnInit() {
		this.menuItems = APP_MENU;
		var navbar: HTMLElement = this.element.nativeElement;
		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
	}

	getTitle() {
		let routePath = window.location.pathname;
		routePath = routePath.substring(1);

		const activeMenuItem = this.menuItems.find(item => item.path === routePath);

		return activeMenuItem ? activeMenuItem.title : 'Dashboard';
	}

	getUrl() {
		let routePath = window.location.pathname;
		routePath = routePath.substring(1);

		const activeMenuItem = this.menuItems.find(item => item.path === routePath);

		return activeMenuItem ? `/${activeMenuItem.path}` : '/dashboard';
	}

	sidebarToggle() {
		var toggleButton = this.toggleButton;
		var body = document.getElementsByTagName('body')[0];

		if (this.sidebarVisible == false) {
			setTimeout(function() {
				toggleButton.classList.add('toggled');
			}, 500);
			body.classList.add('nav-open');
			this.sidebarVisible = true;
		} else {
			this.toggleButton.classList.remove('toggled');
			this.sidebarVisible = false;
			body.classList.remove('nav-open');
		}
	}
}
