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

	formatCommObjectiveType(type: string) {
		const dictionary = {
			BATTERY: 'Batería',
			FUEL: 'Fuel',
			GEA: 'GEA',
			DISTRIBUTION: 'Posición de distribución',
			SOLAR_PARK: 'Parque solar fotovoltaico',
			SUB_STATION: 'Sub-estación'
		};
		return dictionary[type] || '---';
	}

	formatWayType(type: string) {
		const dictionary = {
			TRUNKING: 'Trunking',
			FM: 'FM',
			INTERNAL_PHONE: 'Teléfono interno',
			EXTERNAL_PHONE: 'Teléfono ETETCSA',
			CELLPHONE: 'Celular'
		};

		return dictionary[type];
	}
}
