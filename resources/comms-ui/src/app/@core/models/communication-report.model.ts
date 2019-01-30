import { BaseEntity } from '../../@shared/models';
import { CommunicationObjectiveTypes } from './communication-objective.model';
import { CommunicationWayTypes } from './communication-way.model';

export enum CommunicationReportStatus {
	GOOD = 'GOOD',
	REGULAR = 'REGULAR',
	BAD = 'BAD'
}

export interface CommunicationReport extends BaseEntity {
	status: CommunicationReportStatus;
	objective_name: string;
	objective_type: CommunicationObjectiveTypes;
	way_type: CommunicationWayTypes;
	contact_number: string;
	details: string;
	date: string;
	communication_objective_id: string | number;
	communication_way_id: string | number;
	created_at: string;
	updated_at: string;
}

export interface CommunicationsReportSummary {
	[key: string]: CommunicationReport[];
}

export interface CombinedReportSummaries {
	[key: string]: CommunicationsReportSummary;
}

export interface ReportSummaryData {
	id: string;
	name: string;
	type: CommunicationObjectiveTypes;
	date: string;
	ways: CommunicationReport[];
}
