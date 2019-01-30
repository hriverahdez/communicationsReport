import {
	Component,
	OnInit,
	Output,
	Input,
	EventEmitter,
	ChangeDetectorRef,
	AfterContentInit
} from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
	selector: 'comms-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
	providers: [{ provide: CdkStepper, useExisting: WizardComponent }]
})
export class WizardComponent extends CdkStepper
	implements OnInit, AfterContentInit {
	ngAfterContentInit(): void {}
	@Input() title: string;

	@Input() canGoNext: boolean = true;
	@Input() canGoBack: boolean = true;

	@Input() canFinish: boolean = true;
	@Output() finished = new EventEmitter();

	@Input() hasCancelButton: boolean = false;
	@Output() canceled = new EventEmitter();

	constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef) {
		super(dir, changeDetectorRef);
	}

	get isFirstStep() {
		return this.selectedIndex === 0;
	}

	get isLastStep() {
		return this.selectedIndex === this.steps.toArray().length - 1;
	}

	get isValid() {
		return this.selected.stepControl.valid;
	}

	onClick(number: number) {
		this.selectedIndex = number;
	}

	ngOnInit() {}

	finish() {
		this.finished.emit();
	}

	cancel() {
		this.canceled.emit();
	}
}
