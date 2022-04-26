import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrefixsetupComponent } from './add-prefixsetup.component';

describe('AddPrefixsetupComponent', () => {
  let component: AddPrefixsetupComponent;
  let fixture: ComponentFixture<AddPrefixsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrefixsetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrefixsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
