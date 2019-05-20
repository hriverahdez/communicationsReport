import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';
import { ReportRequestsRoutingModule } from './report-requests.routing';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [CommonModule, SharedModule, ReportRequestsRoutingModule]
})
export class ReportRequestsModule {}
