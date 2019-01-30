import { Injectable } from '@angular/core';
import { CommunicationReportsService } from '../@core/services/communication-reports.service';
import { Observable, Subject } from 'rxjs';
import {
	CommunicationsReportSummary,
	CombinedReportSummaries,
	CommunicationReport
} from '../@core/models';
import { ApiResponse } from '../@shared/models';
import { map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class CommunicationReportSandbox {
	private _loading: Subject<boolean> = new Subject();

	saving$: Observable<boolean> = this._loading.asObservable();

	latestReports$: Observable<CommunicationsReportSummary>;

	reports$: Observable<
		CombinedReportSummaries
	> = this.communicationReportsService
		.getAllReports()
		.pipe(map((res: ApiResponse<CombinedReportSummaries>) => res.data));

	constructor(
		private communicationReportsService: CommunicationReportsService,
		private router: Router
	) {}

	loadLatestReports() {
		this._loading.next(true);
		this.latestReports$ = this.communicationReportsService
			.getLatestReports()
			.pipe(
				map((res: ApiResponse<CommunicationsReportSummary>) => res.data),
				finalize(() => this._loading.next(false))
			);
	}

	createReport(reports: CommunicationReport[]) {
		const sub$ = this.communicationReportsService
			.createReport(reports)
			.subscribe(
				res => {
					console.log('RES:::', res);
					this.router.navigateByUrl('/comms/reports');
					sub$.unsubscribe();
				},
				error => {
					console.error('ERROR CREATING REPORT:::', error);
					sub$.unsubscribe();
				}
			);
	}
}
