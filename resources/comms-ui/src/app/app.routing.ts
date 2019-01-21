import { Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { DashboardComponent } from './dashboard/containers';

export const AppRoutes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'user',
		component: UserComponent
	},
	{
		path: 'table',
		component: TableComponent
	},
	{
		path: 'typography',
		component: TypographyComponent
	},
	{
		path: 'icons',
		component: IconsComponent
	},
	{
		path: 'notifications',
		component: NotificationsComponent
	},
	{
		path: 'upgrade',
		component: UpgradeComponent
	}
];
