import { BaseEntity } from '../../@shared/models';
import { CommunicationReportStatus } from './communication-report.model';
import {
	CommunicationObjective,
	CommunicationObjectiveTypes
} from './communication-objective.model';
import {
	CommunicationWay,
	CommunicationWayTypes
} from './communication-way.model';

export enum CommunicationReportRequestStatus {
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED'
}

export interface ReportRequest extends BaseEntity {
	status?: CommunicationReportStatus;
	objective_name?: string;
	objective_type?: CommunicationObjectiveTypes;
	way_type?: CommunicationWayTypes;
	contact_number?: string;

	details?: string;
	date?: string;
	request_status?: CommunicationReportRequestStatus;

	communication_objective_id?: string | number;
	communication_objective?: CommunicationObjective;
	communication_way_id?: string | number;
	communication_way?: CommunicationWay;

	created_at?: string;
	updated_at?: string;
}
