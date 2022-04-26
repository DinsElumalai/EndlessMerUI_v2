import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpdrnComponent } from './addpdrn.component';

describe('AddpdrnComponent', () => {
  let component: AddpdrnComponent;
  let fixture: ComponentFixture<AddpdrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpdrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpdrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
