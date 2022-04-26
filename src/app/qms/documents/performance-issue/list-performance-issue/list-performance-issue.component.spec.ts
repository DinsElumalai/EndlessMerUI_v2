import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPerformanceIssueComponent } from './list-performance-issue.component';

describe('ListPerformanceIssueComponent', () => {
  let component: ListPerformanceIssueComponent;
  let fixture: ComponentFixture<ListPerformanceIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPerformanceIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPerformanceIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
