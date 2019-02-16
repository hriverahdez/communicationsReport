import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

import {
	Params,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from '@angular/router';

export interface AppState {
	routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export interface RouterStateUrl {
	url: string;
	queryParams: Params;
	params: Params;
}

export const reducers: ActionReducerMap<AppState> = {
	routerReducer: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<
	fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

// Router Serializer
export class CustomSerializer
	implements fromRouter.RouterStateSerializer<RouterStateUrl> {
	serialize(routerState: RouterStateSnapshot): RouterStateUrl {
		const { url } = routerState;
		const { queryParams } = routerState.root;
		let state: ActivatedRouteSnapshot = routerState.root;
		while (state.firstChild) {
			state = state.firstChild;
		}
		const { params } = state;
		return { url, queryParams, params };
	}
}
