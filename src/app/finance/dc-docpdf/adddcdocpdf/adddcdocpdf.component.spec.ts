import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddcdocpdfComponent } from './adddcdocpdf.component';

describe('AdddcdocpdfComponent', () => {
  let component: AdddcdocpdfComponent;
  let fixture: ComponentFixture<AdddcdocpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddcdocpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddcdocpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
