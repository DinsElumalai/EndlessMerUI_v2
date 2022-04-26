import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpponComponent } from './listppon.component';

describe('ListpponComponent', () => {
  let component: ListpponComponent;
  let fixture: ComponentFixture<ListpponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
