import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';
import { SharedModule } from '../@shared/shared.module';

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [CommonModule, SharedModule]
})
export class DashboardModule {}
