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

	detailsShown: boolean = false;
	selectedReport = null;

	constructor(private sandbox: CommunicationReportSandbox) {}

	ngOnInit() {
		this.reports$ = this.sandbox.reports$;
	}

	hasCreatedReportForToday(reports) {
		const today = this.removeTime(new Date());

		// return this.getIterableData(reports).some(r => {
		// 	return r.dates.some(d => {
		// 		const date = this.removeTime(new Date(d));
		// 		return date.getTime() === today.getTime();
		// 	});
		// });
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
		const reportDates = Object.keys(data);

		return reportDates.map(date => ({ date, reports: data[date] }));
	}

	showDetails(selectedReport) {
		this.detailsShown = true;
		this.selectedReport = selectedReport;
	}

	hideDetails() {
		this.detailsShown = false;
		this.selectedReport = null;
	}
}
