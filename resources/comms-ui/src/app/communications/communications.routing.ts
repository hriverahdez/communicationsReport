import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

const ROUTES: Routes = [
	{
		path: 'comms',
		children: [
			{
				path: '',
				component: fromContainers.CommunicationsPageComponent
			},
			{
				path: 'reports',
				children: [
					{
						path: '',
						component: fromContainers.CommunicationReportsPageComponent
					},
					{
						path: 'details/:id',
						component: fromComponents.CommunicationReportDetailsComponent
					},
					{
						path: 'create',
						component: fromContainers.CommunicationReportComponent
					}
				]
			}
		]
	}
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(ROUTES)],
	exports: [RouterModule]
})
export class CommunicationsRoutingModule {}
