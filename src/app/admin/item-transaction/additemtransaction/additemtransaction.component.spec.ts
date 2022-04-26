import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditemtransactionComponent } from './additemtransaction.component';

describe('AdditemtransactionComponent', () => {
  let component: AdditemtransactionComponent;
  let fixture: ComponentFixture<AdditemtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditemtransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditemtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
