import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiDocpdfComponent } from './di-docpdf.component';

describe('DiDocpdfComponent', () => {
  let component: DiDocpdfComponent;
  let fixture: ComponentFixture<DiDocpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiDocpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiDocpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
