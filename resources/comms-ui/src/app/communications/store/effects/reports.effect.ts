import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actionConstants from '../constants/reports.constant';
import * as actionCreators from '../actions/reports.action';
import { switchMap, map, catchError } from 'rxjs/operators';

import { CommunicationReportsService } from '../../../@core/services/communication-reports.service';
import { ApiResponse } from '../../../@shared/models';
import { CombinedReportSummaries } from '../../../@core/models';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ReportsEffects {
	constructor(
		private actions$: Actions,
		private communicationReportsService: CommunicationReportsService
	) {}

	@Effect()
	loadReports$ = this.actions$.pipe(
		ofType(actionConstants.LOAD_COMMUNICATION_REPORTS),
		switchMap(() => {
			return this.communicationReportsService.getAllReports().pipe(
				map(
					(res: ApiResponse<CombinedReportSummaries>) =>
						new actionCreators.LoadCommunicationReportsSuccess(res.data)
				),
				catchError(error =>
					of(new actionCreators.LoadCommunicationReportsFail(error))
				)
			);
		})
	);
}
