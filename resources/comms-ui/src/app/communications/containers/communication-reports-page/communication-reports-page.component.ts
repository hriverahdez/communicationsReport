import { Component, OnInit } from '@angular/core';
import { CommunicationReportSandbox } from '../../communication-report.sandbox';
import { Observable } from 'rxjs';
import { CombinedReportSummaries } from '../../../@core/models';

@Component({
	selector: 'comms-communication-reports-page',
	templateUrl: './communication-reports-page.component.html',
	styleUrls: ['./communication-reports-page.component.scss']
})
export class CommunicationReportsPageComponent implements OnInit {
	reports$: Observable<CombinedReportSummaries>;

	constructor(private sandbox: CommunicationReportSandbox) {}

	ngOnInit() {
		this.reports$ = this.sandbox.reports$;
	}

	canCreate(reports) {
		return this.getIterableData(reports).some(r => {
			const today = new Date();
			return r.dates.some(d => {
				const date = new Date(d);
				return date === today;
			});
		});
	}

	createReport() {}

	getIterableData(data: CombinedReportSummaries) {
		const objectiveNameKeys = Object.keys(data);

		return objectiveNameKeys.map(key => {
			const reportDateKeys = Object.keys(data[key]);

			const firstDateKey = reportDateKeys[0];
			const reports = data[key][firstDateKey];
			const firstReport = reports[0];

			return {
				id: key,
				name: firstReport.objective_name,
				dates: reportDateKeys
			};
		});
	}
}
