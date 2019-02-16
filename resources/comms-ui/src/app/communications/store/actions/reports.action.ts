import { Action } from '@ngrx/store';

import * as constants from '../constants';
import { CombinedReportSummaries } from '../../../@core/models';

export class LoadCommunicationReports implements Action {
	readonly type = constants.LOAD_COMMUNICATION_REPORTS;
}

export class LoadCommunicationReportsFail implements Action {
	readonly type = constants.LOAD_COMMUNICATION_REPORTS_FAIL;

	constructor(public payload: any) {}
}

export class LoadCommunicationReportsSuccess implements Action {
	readonly type = constants.LOAD_COMMUNICATION_REPORTS_SUCCESS;

	constructor(public payload: CombinedReportSummaries) {}
}

export type CommunicationReportActions =
	| LoadCommunicationReports
	| LoadCommunicationReportsFail
	| LoadCommunicationReportsSuccess;
