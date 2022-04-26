import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpponComponent } from './addppon.component';

describe('AddpponComponent', () => {
  let component: AddpponComponent;
  let fixture: ComponentFixture<AddpponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
