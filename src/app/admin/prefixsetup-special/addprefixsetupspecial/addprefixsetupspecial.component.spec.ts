import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprefixsetupspecialComponent } from './addprefixsetupspecial.component';

describe('AddprefixsetupspecialComponent', () => {
  let component: AddprefixsetupspecialComponent;
  let fixture: ComponentFixture<AddprefixsetupspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprefixsetupspecialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprefixsetupspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
