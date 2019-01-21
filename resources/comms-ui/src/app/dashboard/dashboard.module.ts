import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// containers
import * as fromContainers from './containers';

@NgModule({
	declarations: [...fromContainers.containers],
	imports: [CommonModule]
})
export class DashboardModule {}
