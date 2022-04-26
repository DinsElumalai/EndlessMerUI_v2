import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeregComponent } from './employeereg.component';

describe('EmployeeregComponent', () => {
  let component: EmployeeregComponent;
  let fixture: ComponentFixture<EmployeeregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
