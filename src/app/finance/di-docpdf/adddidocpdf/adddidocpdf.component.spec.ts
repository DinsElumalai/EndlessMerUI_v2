import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddidocpdfComponent } from './adddidocpdf.component';

describe('AdddidocpdfComponent', () => {
  let component: AdddidocpdfComponent;
  let fixture: ComponentFixture<AdddidocpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddidocpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddidocpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
