import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

const ROUTES: Routes = [
	{
		path: 'comms',
		children: [
			{
				path: '',
				component: fromContainers.CommunicationsPageComponent
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
