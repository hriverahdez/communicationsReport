import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './store';

import { CommunicationReportsService } from '../@core/services/communication-reports.service';
import { Observable, Subject, of } from 'rxjs';
import {
	CommunicationsReportSummary,
	CombinedReportSummaries,
	CommunicationReport,
	CommunicationObjectiveTypes
} from '../@core/models';

import { ApiResponse } from '../@shared/models';
import { map, finalize, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { isArray } from 'util';

@Injectable({
	providedIn: 'root'
})
export class CommunicationReportSandbox {
	private _loading: Subject<boolean> = new Subject();

	saving$: Observable<boolean> = this._loading.asObservable();

	latestReports$: Observable<CommunicationsReportSummary>;

	loading$: Observable<boolean> = this.store$.pipe(
		select(fromStore.selectReportsLoading)
	);

	reports$: Observable<CombinedReportSummaries> = this.store$.pipe(
		select(fromStore.selectReportsSummaries)
	);

	constructor(
		private communicationReportsService: CommunicationReportsService,
		private store$: Store<fromStore.CommunicationsFeatureState>,
		private router: Router
	) {}

	loadAllReports() {
		this.store$.dispatch(new fromStore.LoadCommunicationReports());
	}

	loadLatestReports(group: string = null) {
		this._loading.next(true);
		const typesMap = {
			GENERATION: [
				CommunicationObjectiveTypes.BATTERY,
				CommunicationObjectiveTypes.FUEL,
				CommunicationObjectiveTypes.GEA
			],
			DISTRIBUTION: [
				CommunicationObjectiveTypes.DISTRIBUTION,
				CommunicationObjectiveTypes.SUB_STATION
			],
			PSFV: [CommunicationObjectiveTypes.SOLAR_PARK]
		};

		const types = group ? typesMap[group] : null;

		this.latestReports$ = this.communicationReportsService
			.getLatestReports(types)
			.pipe(
				map((res: ApiResponse<CommunicationsReportSummary>) => res.data),
				tap((data: any) => {
					if (isArray(data) && data.length === 0) {
						this.router.navigateByUrl('/comms/reports');
						window.alert(
							'No hay vias de comunicación para los tipos seleccionados o no se han creado objetivos de ese tipo'
						);
					}
				}),
				catchError((response: HttpErrorResponse) => {
					console.debug(response);
					this.router.navigateByUrl('/comms/reports');
					if (response.status === 400) {
						window.alert('El reporte de hoy ya fue creado para esa categoría');
					}
					return of(null);
				}),
				finalize(() => this._loading.next(false))
			);
	}

	createReport(reports: CommunicationReport[]) {
		const sub$ = this.communicationReportsService
			.createReport(reports)
			.subscribe(
				res => {
					console.log('RES:::', res);
					this.router.navigateByUrl('/comms/reports');
					sub$.unsubscribe();
				},
				error => {
					console.error('ERROR CREATING REPORT:::', error);
					sub$.unsubscribe();
				}
			);
	}
}
