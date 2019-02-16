import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromReports from '../reducers/reports.reducer';

export const selectReportsState = createSelector(
	fromFeature.selectCommunicationsFeatureState,
	state => state.reports
);

export const selectReportsLoading = createSelector(
	selectReportsState,
	fromReports.selectReportsLoading
);

export const selectReportsSummaries = createSelector(
	selectReportsState,
	fromReports.selectReportSummaries
);
