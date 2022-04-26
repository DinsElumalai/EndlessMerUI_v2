import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOrderScheduleComponent } from './item-order-schedule.component';

describe('ItemOrderScheduleComponent', () => {
  let component: ItemOrderScheduleComponent;
  let fixture: ComponentFixture<ItemOrderScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOrderScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOrderScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
