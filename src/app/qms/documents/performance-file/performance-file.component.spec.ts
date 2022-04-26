import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceFileComponent } from './performance-file.component';

describe('PerformanceFileComponent', () => {
  let component: PerformanceFileComponent;
  let fixture: ComponentFixture<PerformanceFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
