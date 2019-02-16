import { Component, OnInit } from '@angular/core';
import { CommunicationReportSandbox } from '../../communication-report.sandbox';
import { Observable } from 'rxjs';
import {
	CombinedReportSummaries,
	CommunicationsReportSummary
} from '../../../@core/models';
import { defaultBsDatepickerConfig } from '../../../@shared/utils/configs';
import { removeTimeFromDate, parseDate } from '../../../@shared/utils/helpers';

@Component({
	selector: 'comms-communication-reports-page',
	templateUrl: './communication-reports-page.component.html',
	styleUrls: ['./communication-reports-page.component.scss']
})
export class CommunicationReportsPageComponent implements OnInit {
	bsDatepickerConfig = defaultBsDatepickerConfig;
	reports$: Observable<CombinedReportSummaries>;

	detailsShown: boolean = false;
	selectedReport = null;
	loading$: Observable<boolean>;

	originalData: CombinedReportSummaries;

	searchDate: Date = null;

	filteredData: {
		date: string;
		reports: CommunicationsReportSummary;
	}[] = [];

	constructor(private sandbox: CommunicationReportSandbox) {}

	ngOnInit() {
		this.register();
		this.sandbox.loadAllReports();
	}

	private register() {
		this.loading$ = this.sandbox.loading$;
		this.reports$ = this.sandbox.reports$;
		this.reports$.subscribe(data => {
			if (data) {
				this.originalData = data;
				this.filteredData = this.getIterableData(data);
			}
		});
	}

	hasCreatedReportForToday(reports) {
		// TODO: MAYBE ADD VALIDATION TO PREVENT DOUBLE REPORT CREATION
	}

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

	search(date: Date) {
		if (date) {
			const dateWithoutTime = removeTimeFromDate(date);
			const data = this.getIterableData(this.originalData);
			this.filteredData = data.filter(rep => {
				const reportDate = removeTimeFromDate(parseDate(rep.date));

				return reportDate.getTime() === dateWithoutTime.getTime();
			});
		} else {
			this.searchDate = null;
			this.filteredData = this.getIterableData(this.originalData);
		}
	}
}
