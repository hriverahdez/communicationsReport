import { CommunicationWay } from './communication-way.model';
import { BaseEntity } from '../../@shared/models';

export enum CommunicationObjectiveTypes {
	BATTERY = 'BATTERY',
	FUEL = 'FUEL',
	GEA = 'GEA',
	DISTRIBUTION = 'DISTRIBUTION',
	SOLAR_PARK = 'SOLAR_PARK',
	SUB_STATION = 'SUB_STATION'
}

export interface CommunicationObjective extends BaseEntity {
	name?: string;
	type: CommunicationObjectiveTypes;

	communicationWays: CommunicationWay[];
}
