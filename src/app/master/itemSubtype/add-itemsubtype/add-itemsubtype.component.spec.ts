import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsubtypeComponent } from './add-itemsubtype.component';

describe('AddItemsubtypeComponent', () => {
  let component: AddItemsubtypeComponent;
  let fixture: ComponentFixture<AddItemsubtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemsubtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemsubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
