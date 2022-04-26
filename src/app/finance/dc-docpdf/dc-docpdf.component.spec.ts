import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcDocpdfComponent } from './dc-docpdf.component';

describe('DcDocpdfComponent', () => {
  let component: DcDocpdfComponent;
  let fixture: ComponentFixture<DcDocpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcDocpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcDocpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
