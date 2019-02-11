import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'comms-card-body',
	template: `
		<ng-container>
			<div class="content">
				<ng-content></ng-content>
				<div class="footer">
					<ng-content select="comms-card-footer"></ng-content>
				</div>
			</div>
		</ng-container>
	`,
	styleUrls: ['./card-body.component.scss']
})
export class CardBodyComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
