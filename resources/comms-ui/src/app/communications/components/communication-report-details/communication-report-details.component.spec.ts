import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationReportDetailsComponent } from './communication-report-details.component';

describe('CommunicationReportDetailsComponent', () => {
  let component: CommunicationReportDetailsComponent;
  let fixture: ComponentFixture<CommunicationReportDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationReportDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
