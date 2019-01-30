import { Component, OnInit } from '@angular/core';
import {
	CommunicationReport,
	CommunicationsReportSummary,
	ReportSummaryData
} from '../../../@core/models';
import { CommunicationReportSandbox } from '../../communication-report.sandbox';
import { Observable } from 'rxjs';

@Component({
	selector: 'comms-communication-report',
	templateUrl: './communication-report.component.html',
	styleUrls: ['./communication-report.component.scss']
})
export class CommunicationReportComponent implements OnInit {
	latestReports$: Observable<CommunicationsReportSummary>;

	saving$: Observable<boolean>;

	constructor(private sandbox: CommunicationReportSandbox) {}

	ngOnInit() {
		this.saving$ = this.sandbox.saving$;
		this.sandbox.loadLatestReports();
		this.latestReports$ = this.sandbox.latestReports$;
	}

	createReport(reports: CommunicationReport[]) {
		this.sandbox.createReport(reports);
	}

	getIterableSummaryData(
		summary: CommunicationsReportSummary
	): ReportSummaryData[] {
		const objectiveIds = Object.keys(summary);

		return objectiveIds.map(id => {
			// Get these fields from the first value of the
			// array only because they're are the same for every
			// item
			const name = summary[id][0].objective_name;
			const type = summary[id][0].objective_type;
			const date = summary[id][0].date;

			return {
				id,
				name,
				type,
				date,
				ways: summary[id]
			};
		});
	}
}
