import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddempregComponent } from './addempreg.component';

describe('AddempregComponent', () => {
  let component: AddempregComponent;
  let fixture: ComponentFixture<AddempregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddempregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddempregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
