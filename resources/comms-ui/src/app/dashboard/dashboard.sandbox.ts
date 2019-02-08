import { Injectable } from '@angular/core';
import { StatsService } from '../@core/services/stats.service';
import { Observable } from 'rxjs';
import { CommunicationObjectiveGroupsAvailabilityTotals } from '../@core/models/stats.model';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../@shared/models';

@Injectable({
	providedIn: 'root'
})
export class DashboardSandbox {
	groupAvailabilityTotals$: Observable<
		CommunicationObjectiveGroupsAvailabilityTotals
	> = this.statsService
		.getCommunicationGroupsTotalAvailability()
		.pipe(
			map(
				(res: ApiResponse<CommunicationObjectiveGroupsAvailabilityTotals>) =>
					res.data
			)
		);

	constructor(private statsService: StatsService) {}
}
