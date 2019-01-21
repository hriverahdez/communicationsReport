import { BaseEntity } from '../../@shared/models';

export enum CommunicationWayTypes {
	TRUNKING = 'TRUNKING',
	FM = 'FM',
	CELLPHONE = 'CELLPHONE',
	INTERNAL_PHONE = 'INTERNAL_PHONE',
	EXTERNAL_PHONE = 'EXTERNAL_PHONE'
}

export interface CommunicationWay extends BaseEntity {
	type?: CommunicationWayTypes;
	contact_number?: string;

	communication_objective_id?: string | number;
}
