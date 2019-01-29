import { Component, OnInit } from '@angular/core';
import {
	CommunicationReport,
	CommunicationsReportSummary
} from '../../../@core/models';
import { CommunicationReportSandbox } from '../../communication-report.sandbox';
import { Observable } from 'rxjs';

@Component({
	selector: 'comms-communication-report',
	templateUrl: './communication-report.component.html',
	styleUrls: ['./communication-report.component.scss']
})
export class CommunicationReportComponent implements OnInit {
	report: CommunicationReport;

	completed = false

	latestReports$: Observable<CommunicationsReportSummary>;

	constructor(private sandbox: CommunicationReportSandbox) {}

	ngOnInit() {
		this.latestReports$ = this.sandbox.latestReports$;
		this.latestReports$.subscribe(vale =>
			console.log('here::::', this.getIterableData(vale))
		);
	}

	getIterableData(summary: CommunicationsReportSummary) {
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
