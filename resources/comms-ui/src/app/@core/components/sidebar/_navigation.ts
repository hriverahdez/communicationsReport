export interface MenuItem {
	path: string;
	title: string;
	icon: string;
	class: string;
	exactRoute?: boolean;
}

export const APP_MENU: MenuItem[] = [
	{ path: 'dashboard', title: 'Dashboard', icon: 'ti-panel', class: '' },
	{
		path: 'comms',
		title: 'Objetivos',
		icon: 'ti-view-list-alt',
		class: '',
		exactRoute: true
	},
	{
		path: 'comms/reports',
		title: 'Reportes',
		icon: 'ti-archive',
		class: ''
		// exactRoute: true
	},
	{ path: 'user', title: 'User Profile', icon: 'ti-user', class: '' },
	{ path: 'typography', title: 'Typography', icon: 'ti-text', class: '' },
	{ path: 'icons', title: 'Icons', icon: 'ti-pencil-alt2', class: '' },
	{ path: 'maps', title: 'Maps', icon: 'ti-map', class: '' },
	{ path: 'notifications', title: 'Notifications', icon: 'ti-bell', class: '' },
	{
		path: 'upgrade',
		title: 'Upgrade to PRO',
		icon: 'ti-export',
		class: 'active-pro'
	}
];
