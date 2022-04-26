import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerformanceFileComponent } from './add-performance-file.component';

describe('AddPerformanceFileComponent', () => {
  let component: AddPerformanceFileComponent;
  let fixture: ComponentFixture<AddPerformanceFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPerformanceFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPerformanceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
