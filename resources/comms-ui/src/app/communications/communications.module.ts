import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationsRoutingModule } from './communications.routing';
import { SharedModule } from '../@shared/shared.module';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

// store
import { reducers, effects } from './store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [
		CommonModule,
		CommunicationsRoutingModule,
		SharedModule,

		StoreModule.forFeature('communicationsFeatureState', reducers),
		EffectsModule.forFeature(effects)
	]
})
export class CommunicationsModule {}
