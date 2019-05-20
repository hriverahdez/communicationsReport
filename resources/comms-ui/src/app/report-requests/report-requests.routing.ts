import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

const ROUTES: Routes = [
	{
		path: 'requests',
		children: [
			{
				path: '',
				component: fromContainers.ReportRequestsPageComponent
			},
			{
				path: 'create',
				component: fromContainers.RequestItemComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(ROUTES)],
	exports: [RouterModule]
})
export class ReportRequestsRoutingModule {}
