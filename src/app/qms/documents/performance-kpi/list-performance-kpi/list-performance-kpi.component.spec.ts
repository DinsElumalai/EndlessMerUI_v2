import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPerformanceKpiComponent } from './list-performance-kpi.component';

describe('ListPerformanceKpiComponent', () => {
  let component: ListPerformanceKpiComponent;
  let fixture: ComponentFixture<ListPerformanceKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPerformanceKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPerformanceKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
