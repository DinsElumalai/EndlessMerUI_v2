import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditemdocumentComponent } from './additemdocument.component';

describe('AdditemdocumentComponent', () => {
  let component: AdditemdocumentComponent;
  let fixture: ComponentFixture<AdditemdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditemdocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditemdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
