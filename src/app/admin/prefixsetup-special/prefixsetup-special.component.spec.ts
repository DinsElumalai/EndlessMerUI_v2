import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefixsetupSpecialComponent } from './prefixsetup-special.component';

describe('PrefixsetupSpecialComponent', () => {
  let component: PrefixsetupSpecialComponent;
  let fixture: ComponentFixture<PrefixsetupSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefixsetupSpecialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefixsetupSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
