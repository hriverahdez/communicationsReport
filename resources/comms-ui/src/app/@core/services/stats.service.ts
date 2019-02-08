import { Injectable } from '@angular/core';
import { AbstractApiBaseService } from '../../@shared/asyncServices/http/abstract-api-base.service';
import { HttpClient } from '@angular/common/http';
import {
	AvailabilityDetails,
	DailyAvailabilityStats,
	CommunicationObjectiveGroupsAvailabilityTotals
} from '../models/stats.model';

@Injectable({
	providedIn: 'root'
})
export class StatsService extends AbstractApiBaseService {
	constructor(http: HttpClient) {
		super(http);
	}

	getDailyAvailabilityStats(date: string = null) {
		let queryString = '';
		if (date) {
			queryString = `date=${date}`;
		}
		return this.get<DailyAvailabilityStats>(`stats/daily?${queryString}`);
	}

	getCommunicationGroupsTotalAvailability() {
		return this.get<CommunicationObjectiveGroupsAvailabilityTotals>(
			`stats/groupTotals`
		);
	}
}
