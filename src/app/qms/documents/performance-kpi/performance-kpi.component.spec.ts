import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceKpiComponent } from './performance-kpi.component';

describe('PerformanceKpiComponent', () => {
  let component: PerformanceKpiComponent;
  let fixture: ComponentFixture<PerformanceKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
