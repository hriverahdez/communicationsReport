import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'comms-card-header',
	template: `
		<ng-container>
			<div class="pull-left">
				<h4 class="title">{{ title }}</h4>
				<p class="category">{{ subtitle }}</p>
			</div>
			<div class="pull-right"><ng-content></ng-content></div>
			<div class="clearfix"></div>
		</ng-container>
	`,
	styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent implements OnInit {
	@Input() title: string;
	@Input() subtitle: string;

	constructor() {}

	ngOnInit() {}
}
