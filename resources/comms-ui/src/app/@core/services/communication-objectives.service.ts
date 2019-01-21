import { Injectable } from '@angular/core';
import { AbstractCrudService } from '../../@shared/asyncServices/http/abstract-crud.service';
import { CommunicationReport } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CommunicationObjectivesService extends AbstractCrudService<
	CommunicationReport
> {
	constructor(httpClient: HttpClient) {
		super(httpClient);
	}

	protected get modelName() {
		return 'communication_objective';
	}
}
