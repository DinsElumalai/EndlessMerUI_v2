import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditemreptseqvndrComponent } from './additemreptseqvndr.component';

describe('AdditemreptseqvndrComponent', () => {
  let component: AdditemreptseqvndrComponent;
  let fixture: ComponentFixture<AdditemreptseqvndrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditemreptseqvndrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditemreptseqvndrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
