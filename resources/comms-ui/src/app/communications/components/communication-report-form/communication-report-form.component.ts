import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'comms-communication-report-form',
  templateUrl: './communication-report-form.component.html',
  styleUrls: ['./communication-report-form.component.scss']
})
export class CommunicationReportFormComponent implements OnInit {

  constructor(
		private formBuilder: FormBuilder
	) { }

  ngOnInit() {
	}
	
	toFormGroup(): FormGroup {
		return this.formBuilder.group({
			status: [null, [Validators.required]],
			details: [''],
			date: [null, [Validators.required]],
		})
	}

}
