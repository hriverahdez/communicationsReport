import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'comms-card-footer',
	template: `
		<ng-content></ng-content>
	`,
	styleUrls: ['./card-footer.component.scss']
})
export class CardFooterComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
