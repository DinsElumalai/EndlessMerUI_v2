import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerformanceKpiComponent } from './add-performance-kpi.component';

describe('AddPerformanceKpiComponent', () => {
  let component: AddPerformanceKpiComponent;
  let fixture: ComponentFixture<AddPerformanceKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPerformanceKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPerformanceKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
