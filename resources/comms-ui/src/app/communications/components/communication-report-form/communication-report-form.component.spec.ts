import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationReportFormComponent } from './communication-report-form.component';

describe('CommunicationReportFormComponent', () => {
  let component: CommunicationReportFormComponent;
  let fixture: ComponentFixture<CommunicationReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
