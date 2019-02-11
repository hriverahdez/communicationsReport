import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';

import {
	BsDropdownModule,
	BsDatepickerModule,
	defineLocale,
	BsLocaleService,
	TooltipModule
} from 'ngx-bootstrap';

import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

const exportedModules = [
	FormsModule,
	ReactiveFormsModule,
	CdkStepperModule,
	BsDropdownModule,
	BsDatepickerModule,
	TooltipModule
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
		BsDatepickerModule.forRoot(),
		TooltipModule.forRoot()
	],
	exports: [...fromComponents.components, ...exportedModules]
})
export class SharedModule {
	/** Setting NGX-BOOTSTRAP's Locale to Spanish to
	 *  display components such as datepicker in that language
	 */
	// constructor(private localeService: BsLocaleService) {
	// 	this.localeService.use('es');
	// }
}
