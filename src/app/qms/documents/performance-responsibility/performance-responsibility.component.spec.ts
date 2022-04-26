import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceResponsibilityComponent } from './performance-responsibility.component';

describe('PerformanceResponsibilityComponent', () => {
  let component: PerformanceResponsibilityComponent;
  let fixture: ComponentFixture<PerformanceResponsibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceResponsibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
