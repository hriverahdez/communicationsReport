import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRequestsPageComponent } from './report-requests-page.component';

describe('ReportRequestsPageComponent', () => {
  let component: ReportRequestsPageComponent;
  let fixture: ComponentFixture<ReportRequestsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRequestsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
