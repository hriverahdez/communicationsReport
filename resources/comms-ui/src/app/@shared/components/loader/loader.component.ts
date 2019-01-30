import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'comms-loader',
	template: `
		<div [class]="loaderContainerClass">
			<div class="loader"></div>
		</div>
	`,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

	@Input() large: boolean = false

  constructor() { }

  ngOnInit() {
	}
	
	get loaderContainerClass() {
		return this.large ? 'loader-container' : 'loader-container-small'
	}

}
