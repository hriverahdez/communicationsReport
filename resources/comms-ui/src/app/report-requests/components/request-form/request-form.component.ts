import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReportRequest } from '../../../@core/models/report-request.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
	CommunicationObjective,
	CommunicationWay
} from '../../../@core/models';
import {
	formatCommObjectiveType,
	formatWayType
} from '../../../@shared/utils/formatters';

@Component({
	selector: 'comms-request-form',
	templateUrl: './request-form.component.html',
	styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
	reportRequestForm: FormGroup;
	formatCommObjectiveType = formatCommObjectiveType;
	formatWayType = formatWayType;

	@Input()
	reportRequest: ReportRequest;

	@Input()
	commObjective: CommunicationObjective;

	@Input()
	commWay: CommunicationWay;

	@Output()
	create = new EventEmitter<ReportRequest>();

	@Output()
	cancel = new EventEmitter();

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.reportRequestForm = this.toFormGroup();
	}

	toFormGroup() {
		return this.formBuilder.group({
			status: ['REGULAR', Validators.required],
			details: ['', Validators.required],
			communicationObjective: [this.commObjective, Validators.required],
			communicationWay: [this.commWay, Validators.required]
		});
	}

	save(form: FormGroup) {
		const { valid, value } = form;
		if (valid) {
			const {
				status,
				details,
				communicationObjective,
				communicationWay
			} = value;

			this.create.emit({
				status,
				details,
				communication_objective_id: communicationObjective.id,
				communication_way_id: communicationWay.id
			});
		}
	}
}
