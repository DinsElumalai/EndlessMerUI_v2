import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoftwaresetupComponent } from './add-softwaresetup.component';

describe('AddSoftwaresetupComponent', () => {
  let component: AddSoftwaresetupComponent;
  let fixture: ComponentFixture<AddSoftwaresetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSoftwaresetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoftwaresetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
