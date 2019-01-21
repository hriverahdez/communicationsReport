import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import * as fromComponents from './components';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [...fromComponents.components],
	imports: [CommonModule, RouterModule],
	exports: [...fromComponents.components]
})
export class CoreModule {
	constructor(
		@Optional()
		@SkipSelf()
		parentModule: CoreModule
	) {
		if (parentModule) {
			throw new Error('CoreModule is already loaded. Import only in AppModule');
		}
	}
}
