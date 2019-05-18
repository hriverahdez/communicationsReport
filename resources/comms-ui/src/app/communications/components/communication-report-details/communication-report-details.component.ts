import { Component, OnInit, Input } from '@angular/core';
import {
	CommunicationsReportSummary,
	CommunicationReport,
	CommunicationReportStatus
} from '../../../@core/models';

import {
	formatReportStatus,
	formatWayType,
	formatCommObjectiveType
} from '../../../@shared/utils/formatters';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'comms-communication-report-details',
	templateUrl: './communication-report-details.component.html',
	styleUrls: ['./communication-report-details.component.scss']
})
export class CommunicationReportDetailsComponent implements OnInit {
	@Input() selectedReport: {
		date: string;
		reports: CommunicationsReportSummary;
	};

	formatReportStatus = formatReportStatus;
	formatWayType = formatWayType;
	formatCommObjectiveType = formatCommObjectiveType;

	objectives: CommunicationReport[][];

	searchType: string = '';
	searchNotifier$: Subject<string> = new Subject();

	constructor() {}

	ngOnInit() {
		this.objectives = this.getObjectives();
		this.registerSearchListener();
	}

	registerSearchListener(): any {
		this.searchNotifier$
			.asObservable()
			.pipe(
				debounceTime(300),
				distinctUntilChanged()
			)
			.subscribe(terms => this.searchByName(terms));
	}

	getObjectives() {
		return Object.keys(this.selectedReport.reports).map(
			k => this.selectedReport.reports[k]
		);
	}

	getStatusBadgesClassMap(report: CommunicationReport) {
		const labelsClassMap = {
			'label-primary': report.status === CommunicationReportStatus.GOOD,
			'label-warning': report.status === CommunicationReportStatus.REGULAR,
			'label-danger': report.status === CommunicationReportStatus.BAD
		};
		return labelsClassMap;
	}

	searchByType(objectives = null) {
		const data = objectives || this.getObjectives();

		if (this.searchType !== '') {
			this.objectives = data
				.map(reps => {
					return reps.filter(rep => {
						return rep.objective_type === this.searchType;
					});
				})
				.filter(a => a.length !== 0);
		} else {
			this.objectives = this.getObjectives();
		}
	}

	searchByName(terms) {
		if (terms !== '') {
			this.objectives = this.objectives
				.map(reps => {
					return reps.filter(rep => {
						return rep.objective_name
							.toLowerCase()
							.trim()
							.includes(terms);
					});
				})
				.filter(a => a.length !== 0);
		} else {
			this.objectives = this.getObjectives();
		}

		if (this.searchType !== '') {
			this.searchByType(this.objectives);
		}
	}
}
