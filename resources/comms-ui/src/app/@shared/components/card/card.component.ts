import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'comms-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	@Input() padding: number;

	constructor() {}

	ngOnInit() {}
}
