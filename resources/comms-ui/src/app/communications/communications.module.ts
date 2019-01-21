import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationsRoutingModule } from './communications.routing';

// containers
import * as fromContainers from './containers';

@NgModule({
	declarations: [...fromContainers.containers],
	imports: [CommonModule, CommunicationsRoutingModule]
})
export class CommunicationsModule {}
