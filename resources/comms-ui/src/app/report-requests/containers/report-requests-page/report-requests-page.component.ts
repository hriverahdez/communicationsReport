import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportRequestsSandbox } from '../../report-requests.sandbox';
import { Observable, Subject } from 'rxjs';
import { ReportRequest } from '../../../@core/models/report-request.model';
import {
	formatCommObjectiveType,
	formatWayType,
	formatReportStatus
} from '../../../@shared/utils/formatters';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'comms-report-requests-page',
	templateUrl: './report-requests-page.component.html',
	styleUrls: ['./report-requests-page.component.scss']
})
export class ReportRequestsPageComponent implements OnInit, OnDestroy {
	formatCommObjectiveType = formatCommObjectiveType;
	formatWayType = formatWayType;
	formatStatus = formatReportStatus;

	loading$: Observable<boolean>;
	pendingRequests$: Observable<ReportRequest[]>;
	pendingRequests: ReportRequest[] = [];

	private unsubscribeAll$: Subject<any> = new Subject();

	constructor(private sandbox: ReportRequestsSandbox) {}

	ngOnInit() {
		this.loading$ = this.sandbox.loading$;
		this.pendingRequests$ = this.sandbox.pendingRequests$;
		this.pendingRequests$
			.pipe(takeUntil(this.unsubscribeAll$))
			.subscribe(req => (this.pendingRequests = req));
	}

	ngOnDestroy(): void {
		this.unsubscribeAll$.next();
		this.unsubscribeAll$.complete();
	}

	createRequest() {}

	acceptRequest(reportRequest: ReportRequest) {}

	rejectRequest(reportRequest: ReportRequest) {}
}
