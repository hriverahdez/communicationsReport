import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
	ReportRequest,
	CommunicationReportRequestStatus
} from '../@core/models/report-request.model';
import { ReportRequestsService } from '../@core/services/report-requests.service';
import { map, finalize } from 'rxjs/operators';
import { ApiResponse } from '../@shared/models';

@Injectable({
	providedIn: 'root'
})
export class ReportRequestsSandbox {
	pendingRequests$: Observable<
		ReportRequest[]
	> = this.reportRequestsService
		.searchItems({ status: CommunicationReportRequestStatus.PENDING })
		.pipe(
			map((res: ApiResponse<ReportRequest[]>) => res.data),
			finalize(() => this._loading.next(false))
		);

	private _loading: BehaviorSubject<boolean> = new BehaviorSubject(true);
	loading$: Observable<boolean> = this._loading.asObservable();

	constructor(private reportRequestsService: ReportRequestsService) {}

	createReportRequest(reportRequest: ReportRequest) {
		return this.reportRequestsService
			.createItem(reportRequest)
			.pipe(map((res: ApiResponse<ReportRequest>) => res.data));
	}
}
