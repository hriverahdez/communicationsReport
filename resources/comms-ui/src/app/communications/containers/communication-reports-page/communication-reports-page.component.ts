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

	hasCreatedReportForToday(reports) {
		const today = this.removeTime(new Date());

		console.log('today', today.getTime());
		return this.getIterableData(reports).some(r => {
			return r.dates.some(d => {
				const date = this.removeTime(new Date(d));
				console.log('date', date.getTime());
				return date.getTime() === today.getTime();
			});
		});
	}

	removeTime(date: Date) {
		const newDate = new Date(date);
		newDate.setHours(0);
		newDate.setMinutes(0);
		newDate.setSeconds(0);
		newDate.setMilliseconds(0);
		return newDate;
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
