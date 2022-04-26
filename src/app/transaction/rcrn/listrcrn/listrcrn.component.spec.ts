import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrcrnComponent } from './listrcrn.component';

describe('ListrcrnComponent', () => {
  let component: ListrcrnComponent;
  let fixture: ComponentFixture<ListrcrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListrcrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListrcrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
