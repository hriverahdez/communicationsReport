import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationObjective } from '../../../@core/models';
import { CommunicationsSandbox } from '../../communications.sandbox';

@Component({
	selector: 'comms-communications-page',
	templateUrl: './communications-page.component.html',
	styleUrls: ['./communications-page.component.scss']
})
export class CommunicationsPageComponent implements OnInit {
	commObjectives$: Observable<CommunicationObjective[]>;

	constructor(private sandbox: CommunicationsSandbox) {}

	ngOnInit() {
		this.sandbox.loadCommunicationObjectives();
		this.commObjectives$ = this.sandbox.commObjectives$;
	}
}
