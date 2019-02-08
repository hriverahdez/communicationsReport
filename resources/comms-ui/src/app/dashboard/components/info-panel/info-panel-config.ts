export enum InfoPanelIconColors {
	info = 'icon-primary',
	success = 'icon-success',
	warning = 'icon-warning',
	danger = 'icon-danger'
}

export interface InfoPanelConfig {
	key?: string;
	iconColor: InfoPanelIconColors;
	icon: string;
	mainText: string;
	title?: string;
	footer?: {
		footerIcon: string;
		footerText: string;
	};
}
