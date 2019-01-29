import { Injectable } from '@angular/core';
import { AbstractCrudService } from '../../@shared/asyncServices/http/abstract-crud.service';
import {
	CommunicationsReportSummary,
	CommunicationReport,
	CombinedReportSummaries
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

	getAllReports() {
		return this.get<CombinedReportSummaries>(`${this.modelName}`);
	}

	getLatestReports() {
		return this.get<CommunicationsReportSummary>(`${this.modelName}/latest`);
	}
}
