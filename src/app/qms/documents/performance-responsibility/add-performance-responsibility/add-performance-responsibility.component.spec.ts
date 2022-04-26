import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerformanceResponsibilityComponent } from './add-performance-responsibility.component';

describe('AddPerformanceResponsibilityComponent', () => {
  let component: AddPerformanceResponsibilityComponent;
  let fixture: ComponentFixture<AddPerformanceResponsibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPerformanceResponsibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPerformanceResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
