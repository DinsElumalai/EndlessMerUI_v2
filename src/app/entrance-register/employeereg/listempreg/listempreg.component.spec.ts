import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListempregComponent } from './listempreg.component';

describe('ListempregComponent', () => {
  let component: ListempregComponent;
  let fixture: ComponentFixture<ListempregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListempregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListempregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
