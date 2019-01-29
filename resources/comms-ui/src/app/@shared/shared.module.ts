import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';

import {
	BsDropdownModule,
	BsDatepickerModule,
	defineLocale,
	BsLocaleService
} from 'ngx-bootstrap';

import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

const exportedModules = [
	ReactiveFormsModule,
	CdkStepperModule,
	BsDropdownModule,
	BsDatepickerModule
];

// components
import * as fromComponents from './components';

@NgModule({
	declarations: [...fromComponents.components],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		...exportedModules,
		BsDropdownModule.forRoot(),
		BsDatepickerModule.forRoot()
	],
	exports: [...fromComponents.components, ...exportedModules]
})
export class SharedModule {
	/** Setting NGX-BOOTSTRAP's Locale to Spanish to
	 *  display components such as datepicker in that language
	 */
	constructor(private localeService: BsLocaleService) {
		this.localeService.use('es');
	}
}
