export interface AvailabilityDetails {
	[propName: string]: {
		total: number;
		available: number;
		percentage: number;
	};
}

export interface DailyAvailabilityStats {
	[propName: string]: AvailabilityDetails;
}

export interface CommunicationObjectiveGroupsAvailabilityTotals {
	date?: string;
	summary: AvailabilityDetails;
}
