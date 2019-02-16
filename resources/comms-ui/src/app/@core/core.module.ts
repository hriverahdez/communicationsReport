import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// components
import * as fromComponents from './components';

import { environment } from '../../environments/environment';
import { reducers, CustomSerializer } from './store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
	StoreRouterConnectingModule,
	RouterStateSerializer
} from '@ngrx/router-store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ModuleWithProviders } from '@angular/compiler/src/core';

export const metaReducers: MetaReducer<any>[] = !environment.production
	? []
	: [];

@NgModule({
	declarations: [...fromComponents.components],
	imports: [
		CommonModule,
		RouterModule,

		StoreModule.forRoot(reducers),

		EffectsModule.forRoot([]),
		StoreRouterConnectingModule,
		!environment.production ? StoreDevtoolsModule.instrument() : []
	],
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

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CoreModule,

			providers: [
				{ provide: RouterStateSerializer, useClass: CustomSerializer }
			]
		};
	}
}
