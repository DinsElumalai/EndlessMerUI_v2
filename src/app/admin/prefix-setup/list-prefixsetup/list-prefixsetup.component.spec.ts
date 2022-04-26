import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrefixsetupComponent } from './list-prefixsetup.component';

describe('ListPrefixsetupComponent', () => {
  let component: ListPrefixsetupComponent;
  let fixture: ComponentFixture<ListPrefixsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPrefixsetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPrefixsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
