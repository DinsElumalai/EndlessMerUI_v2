import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceIssueComponent } from './performance-issue.component';

describe('PerformanceIssueComponent', () => {
  let component: PerformanceIssueComponent;
  let fixture: ComponentFixture<PerformanceIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
