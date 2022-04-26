import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditemorderscheduleComponent } from './additemorderschedule.component';

describe('AdditemorderscheduleComponent', () => {
  let component: AdditemorderscheduleComponent;
  let fixture: ComponentFixture<AdditemorderscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditemorderscheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditemorderscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
