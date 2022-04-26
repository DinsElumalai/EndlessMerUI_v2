import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrpanComponent } from './listrpan.component';

describe('ListrpanComponent', () => {
  let component: ListrpanComponent;
  let fixture: ComponentFixture<ListrpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListrpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListrpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
