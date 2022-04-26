import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPerformanceResponsibilityComponent } from './list-performance-responsibility.component';

describe('ListPerformanceResponsibilityComponent', () => {
  let component: ListPerformanceResponsibilityComponent;
  let fixture: ComponentFixture<ListPerformanceResponsibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPerformanceResponsibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPerformanceResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
