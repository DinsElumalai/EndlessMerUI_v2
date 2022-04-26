import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditemorderComponent } from './additemorder.component';

describe('AdditemorderComponent', () => {
  let component: AdditemorderComponent;
  let fixture: ComponentFixture<AdditemorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditemorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditemorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
