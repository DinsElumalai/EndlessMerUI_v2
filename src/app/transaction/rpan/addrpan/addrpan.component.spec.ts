import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrpanComponent } from './addrpan.component';

describe('AddrpanComponent', () => {
  let component: AddrpanComponent;
  let fixture: ComponentFixture<AddrpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
