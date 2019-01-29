import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'comms-card-body',
	template: `
		<ng-container>
			<ng-content></ng-content>
			<div class="footer">
				<ng-content select="comms-card-footer"></ng-content>
			</div>
		</ng-container>
	`,
	styleUrls: ['./card-body.component.scss']
})
export class CardBodyComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
