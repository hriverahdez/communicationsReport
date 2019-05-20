import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
	takeUntil,
	debounceTime,
	distinctUntilChanged,
	switchMap,
	map,
	tap,
	finalize,
	take,
	catchError
} from 'rxjs/operators';
import { ReportRequestsSandbox } from '../../report-requests.sandbox';
import { CommunicationsSandbox } from '../../../communications/communications.sandbox';
import {
	CommunicationObjective,
	CommunicationWay
} from '../../../@core/models';
import {
	formatCommObjectiveType,
	formatWayType
} from '../../../@shared/utils/formatters';
import { ReportRequest } from '../../../@core/models/report-request.model';
import { Router } from '@angular/router';

@Component({
	selector: 'comms-request-item',
	templateUrl: './request-item.component.html',
	styleUrls: ['./request-item.component.scss']
})
export class RequestItemComponent implements OnInit, OnDestroy {
	formatCommObjectiveType = formatCommObjectiveType;
	formatWayType = formatWayType;

	selectedCommObjective: CommunicationObjective = null;
	selectedCommWay: CommunicationWay = null;

	searchInputCtrl: FormControl = new FormControl();

	loading: boolean = false;
	objectives$: Observable<CommunicationObjective[]>;

	unsubscribeAll$: Subject<any> = new Subject();

	constructor(
		private sandbox: ReportRequestsSandbox,
		private commObjSandbox: CommunicationsSandbox,
		private router: Router
	) {}

	ngOnInit() {
		this.objectives$ = this.searchInputCtrl.valueChanges.pipe(
			debounceTime(300),
			tap(() => (this.loading = true)),
			switchMap(searchKey =>
				this.commObjSandbox.searchObjectives({ name: searchKey }).pipe(
					map(obj =>
						obj.map(o => {
							const communication_ways = o.communication_ways.filter(
								w => w.active
							);
							return { ...o, communication_ways };
						})
					),
					finalize(() => (this.loading = false))
				)
			),
			takeUntil(this.unsubscribeAll$)
		);
	}

	ngOnDestroy(): void {
		this.unsubscribeAll$.next();
		this.unsubscribeAll$.complete();
	}

	createRequest(reportRequest: ReportRequest) {
		this.loading = true;
		this.sandbox
			.createReportRequest(reportRequest)
			.pipe(
				catchError(error => {
					this.loading = false;
					window.alert('Hubo un error creando la solicitud. Intente de nuevo');
					return of(null);
				}),
				take(1)
			)
			.subscribe(created => {
				if (created) {
					this.router.navigateByUrl('/requests');
				}
			});
	}

	selectItemToCreateRequest(
		obj: CommunicationObjective,
		way: CommunicationWay
	) {
		this.selectedCommObjective = obj;
		this.selectedCommWay = way;
	}

	goBackToSearch() {
		this.selectedCommObjective = null;
		this.selectedCommWay = null;
		setTimeout(
			() => this.searchInputCtrl.setValue(this.searchInputCtrl.value),
			16
		);
	}
}
