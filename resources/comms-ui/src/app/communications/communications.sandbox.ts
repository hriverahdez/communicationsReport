import { Injectable } from '@angular/core';

import { CommunicationObjectivesService } from '../@core/services/communication-objectives.service';
import { Observable } from 'rxjs';
import { CommunicationObjective } from '../@core/models';
import { ApiResponse } from '../@shared/models';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CommunicationsSandbox {
	commObjectives$: Observable<CommunicationObjective[]>;

	constructor(
		private communicationObjectivesService: CommunicationObjectivesService
	) {}

	loadCommunicationObjectives() {
		this.commObjectives$ = this.communicationObjectivesService
			.items()
			.pipe(map((res: ApiResponse<CommunicationObjective[]>) => res.data));
	}
}
