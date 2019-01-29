import { Injectable } from '@angular/core';
import { AbstractCrudService } from '../../@shared/asyncServices/http/abstract-crud.service';
import { CommunicationObjective } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CommunicationObjectivesService extends AbstractCrudService<
	CommunicationObjective
> {
	constructor(httpClient: HttpClient) {
		super(httpClient);
	}

	protected get modelName() {
		return 'communication_objective';
	}
}
