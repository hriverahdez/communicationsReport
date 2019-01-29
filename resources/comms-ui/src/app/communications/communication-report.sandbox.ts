import { Injectable } from '@angular/core';
import { CommunicationReportsService } from '../@core/services/communication-reports.service';
import { Observable } from 'rxjs';
import {
	CommunicationsReportSummary,
	CommunicationReport,
	CombinedReportSummaries
} from '../@core/models';
import { ApiResponse } from '../@shared/models';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CommunicationReportSandbox {
	latestReports$: Observable<
		CommunicationsReportSummary
	> = this.communicationReportsService
		.getLatestReports()
		.pipe(map((res: ApiResponse<CommunicationsReportSummary>) => res.data));

	reports$: Observable<
		CombinedReportSummaries
	> = this.communicationReportsService
		.getAllReports()
		.pipe(map((res: ApiResponse<CombinedReportSummaries>) => res.data));

	constructor(
		private communicationReportsService: CommunicationReportsService
	) {}
}
