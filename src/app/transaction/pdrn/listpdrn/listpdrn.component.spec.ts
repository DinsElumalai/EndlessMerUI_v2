import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpdrnComponent } from './listpdrn.component';

describe('ListpdrnComponent', () => {
  let component: ListpdrnComponent;
  let fixture: ComponentFixture<ListpdrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpdrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpdrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
