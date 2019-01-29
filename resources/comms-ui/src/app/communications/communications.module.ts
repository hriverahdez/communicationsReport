import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationsRoutingModule } from './communications.routing';
import { SharedModule } from '../@shared/shared.module';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [CommonModule, CommunicationsRoutingModule, SharedModule]
})
export class CommunicationsModule {}
