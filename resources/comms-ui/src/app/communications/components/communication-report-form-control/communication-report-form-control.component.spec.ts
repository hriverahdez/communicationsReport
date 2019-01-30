import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationReportFormControlComponent } from './communication-report-form-control.component';

describe('CommunicationReportFormControlComponent', () => {
  let component: CommunicationReportFormControlComponent;
  let fixture: ComponentFixture<CommunicationReportFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationReportFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationReportFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
