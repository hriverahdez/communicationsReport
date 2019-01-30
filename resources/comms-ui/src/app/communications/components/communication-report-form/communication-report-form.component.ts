import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
	CommunicationsReportSummary,
	ReportSummaryData,
	CommunicationReport
} from '../../../@core/models';

@Component({
	selector: 'comms-communication-report-form',
	templateUrl: './communication-report-form.component.html',
	styleUrls: ['./communication-report-form.component.scss']
})
export class CommunicationReportFormComponent implements OnInit {
	@Input() latestReportSummary: CommunicationsReportSummary;

	@Input() reportSummaryData: ReportSummaryData[];

	@Output() create = new EventEmitter<CommunicationReport[]>();

	constructor(private formBuilder: FormBuilder) {}

	reportForm: FormGroup;

	ngOnInit() {
		this.reportForm = this.toFormGroup();
	}

	toFormGroup(): FormGroup {
		const arr = this.formBuilder.array([]);

		return this.formBuilder.group({
			allReports: arr
		});
	}

	trackByIndex(index: any, item: any) {
		return index;
	}

	save(reportForm: FormGroup) {
		const { value } = reportForm;

		const allReports: ReportSummaryData[] = value.allReports;

		const entity = allReports.reduce((acc: CommunicationReport[], item) => {
			const date = new Date(item.date);
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			const dateString = `${year}/${month}/${day}`;
			const reports = item.ways.map(w => ({ ...item, ...w, date: dateString }));
			acc = acc.concat(reports);
			return acc;
		}, []);

		this.create.emit(entity);
	}
}
