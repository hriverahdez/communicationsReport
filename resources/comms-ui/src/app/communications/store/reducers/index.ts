import * as fromReports from './reports.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface CommunicationsFeatureState {
	reports: fromReports.State;
}

export const reducers: ActionReducerMap<CommunicationsFeatureState> = {
	reports: fromReports.reducer
};

export const selectCommunicationsFeatureState = createFeatureSelector<
	CommunicationsFeatureState
>('communicationsFeatureState');
