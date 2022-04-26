import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerformanceRevisionComponent } from './add-performance-revision.component';

describe('AddPerformanceRevisionComponent', () => {
  let component: AddPerformanceRevisionComponent;
  let fixture: ComponentFixture<AddPerformanceRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPerformanceRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPerformanceRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
