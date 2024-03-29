import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfprintComponent } from './pdfprint.component';

describe('PdfprintComponent', () => {
  let component: PdfprintComponent;
  let fixture: ComponentFixture<PdfprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfprintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
