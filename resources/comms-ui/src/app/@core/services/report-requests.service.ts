import { Injectable } from '@angular/core';
import { ReportRequest } from '../models/report-request.model';
import { AbstractCrudService } from '../../@shared/asyncServices/http/abstract-crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ReportRequestsService extends AbstractCrudService<ReportRequest> {
	constructor(httpClient: HttpClient) {
		super(httpClient);
	}

	protected get modelName() {
		return 'report_requests';
	}

	acceptRequest(reportRequest: ReportRequest) {}

	rejectRequest(reportRequest: ReportRequest) {}
}
