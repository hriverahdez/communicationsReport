import { CombinedReportSummaries } from '../../../@core/models';

import * as actionConstants from '../constants';
import * as actionCreators from '../actions';

export interface State {
	combinedReportSummaries: CombinedReportSummaries;
	loading: boolean;
	loaded: boolean;
	error: any;
}

export const initialState: State = {
	combinedReportSummaries: null,
	loading: false,
	loaded: false,
	error: null
};

export function reducer(
	state: State = initialState,
	action: actionCreators.CommunicationReportActions
): State {
	switch (action.type) {
		case actionConstants.LOAD_COMMUNICATION_REPORTS: {
			return { ...state, loading: true };
		}

		case actionConstants.LOAD_COMMUNICATION_REPORTS_FAIL: {
			const error = action.payload;
			return { ...state, loading: true, error };
		}

		case actionConstants.LOAD_COMMUNICATION_REPORTS_SUCCESS: {
			const combinedReportSummaries = action.payload;
			return {
				...state,
				loading: false,
				loaded: true,
				combinedReportSummaries
			};
		}

		default: {
			return state;
		}
	}
}

export const selectReportsLoading = (state: State) => state.loading;
export const selectReportSummaries = (state: State) =>
	state.combinedReportSummaries;
