import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'comms-loader',
	template: `
		<div [class]="loaderContainerClass" [ngStyle]="containerStyles">
			<div class="loader" [style.position]="position"></div>
		</div>
	`,
	styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
	@Input() large: boolean = false;
	@Input() position: 'absolute' | 'relative' = 'relative';

	constructor() {}

	ngOnInit() {}

	get containerStyles() {
		if (this.position === 'relative') {
			return {
				position: this.position
			};
		} else {
			return {
				position: this.position,
				background: '#f4f3ef',
				'z-index': 1
			};
		}
	}

	get loaderContainerClass() {
		return this.large ? 'loader-container' : 'loader-container-small';
	}
}
