import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrcrnComponent } from './addrcrn.component';

describe('AddrcrnComponent', () => {
  let component: AddrcrnComponent;
  let fixture: ComponentFixture<AddrcrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrcrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrcrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
