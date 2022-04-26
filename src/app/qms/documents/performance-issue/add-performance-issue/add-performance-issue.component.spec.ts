import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerformanceIssueComponent } from './add-performance-issue.component';

describe('AddPerformanceIssueComponent', () => {
  let component: AddPerformanceIssueComponent;
  let fixture: ComponentFixture<AddPerformanceIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPerformanceIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPerformanceIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
