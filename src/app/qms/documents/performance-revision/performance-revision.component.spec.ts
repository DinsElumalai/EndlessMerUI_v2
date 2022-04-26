import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceRevisionComponent } from './performance-revision.component';

describe('PerformanceRevisionComponent', () => {
  let component: PerformanceRevisionComponent;
  let fixture: ComponentFixture<PerformanceRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
