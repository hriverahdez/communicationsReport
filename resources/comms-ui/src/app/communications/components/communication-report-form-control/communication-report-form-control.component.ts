import { Component, OnInit, Input } from '@angular/core';
import { ReportSummaryData } from '../../../@core/models';
import {
	formatWayType,
	formatCommObjectiveType
} from '../../../@shared/utils/formatters';
import { defaultBsDatepickerConfig } from '../../../@shared/utils/configs';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
	selector: 'comms-communication-report-form-control',
	templateUrl: './communication-report-form-control.component.html',
	styleUrls: ['./communication-report-form-control.component.scss']
})
export class CommunicationReportFormControlComponent implements OnInit {
	@Input() reportData: ReportSummaryData;

	bsDatepickerConfig = defaultBsDatepickerConfig;

	@Input()
	parentForm: FormGroup;

	childForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.childForm = this.toFormGroup();
		const arr = this.parentForm.get('allReports') as FormArray;
		arr.push(this.childForm);
		this.patchForm();
		console.log(this.reportData);
	}

	formatCommObjectiveType(type: string) {
		return formatCommObjectiveType(type);
	}

	formatWayType(type: string) {
		return formatWayType(type);
	}

	get communicationWaysFormArray() {
		return this.childForm.get('ways') as FormArray;
	}

	toFormGroup(): FormGroup {
		const childFormGroups = this.reportData.ways.map(w =>
			this.formBuilder.group({
				status: ['GOOD', [Validators.required]],
				details: [null],
				communication_objective_id: [null],
				communication_way_id: [null]
			})
		);

		const form = this.formBuilder.group({
			id: [null],
			date: [null, [Validators.required]],
			ways: this.formBuilder.array(childFormGroups)
		});

		return form;
	}

	patchForm() {
		const today = new Date();
		this.childForm.patchValue(this.reportData);
		this.childForm.get('date').setValue(today);
	}
}
