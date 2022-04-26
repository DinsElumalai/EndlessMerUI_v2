import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhsncodeComponent } from './addhsncode.component';

describe('AddhsncodeComponent', () => {
  let component: AddhsncodeComponent;
  let fixture: ComponentFixture<AddhsncodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddhsncodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddhsncodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
