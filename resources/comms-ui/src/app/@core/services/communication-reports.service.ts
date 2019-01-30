import { Injectable } from '@angular/core';
import { AbstractCrudService } from '../../@shared/asyncServices/http/abstract-crud.service';
import {
	CommunicationsReportSummary,
	CommunicationReport,
	CombinedReportSummaries,
	CommunicationObjectiveTypes
} from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CommunicationReportsService extends AbstractCrudService<
	CommunicationReport
> {
	constructor(httpClient: HttpClient) {
		super(httpClient);
	}

	protected get modelName() {
		return 'communication_report';
	}

	createReport(reports: CommunicationReport[]) {
		return this.post<CommunicationReport[]>(`${this.modelName}`, reports);
	}

	getAllReports() {
		return this.get<CombinedReportSummaries>(`${this.modelName}`);
	}

	getLatestReports(types?: CommunicationObjectiveTypes[]) {
		let queryString = '';
		if (types) {
			queryString = '?types=' + types.join(',');
		}

		return this.get<CommunicationsReportSummary>(
			`${this.modelName}/latest${queryString}`
		);
	}
}
