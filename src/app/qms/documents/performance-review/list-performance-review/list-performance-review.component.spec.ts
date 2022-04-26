import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPerformanceReviewComponent } from './list-performance-review.component';

describe('ListPerformanceReviewComponent', () => {
  let component: ListPerformanceReviewComponent;
  let fixture: ComponentFixture<ListPerformanceReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPerformanceReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPerformanceReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
