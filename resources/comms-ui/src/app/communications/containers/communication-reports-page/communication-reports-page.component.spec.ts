import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationReportsPageComponent } from './communication-reports-page.component';

describe('CommunicationReportsPageComponent', () => {
  let component: CommunicationReportsPageComponent;
  let fixture: ComponentFixture<CommunicationReportsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationReportsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
