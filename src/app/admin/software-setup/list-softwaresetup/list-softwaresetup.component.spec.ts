import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSoftwaresetupComponent } from './list-softwaresetup.component';

describe('ListSoftwaresetupComponent', () => {
  let component: ListSoftwaresetupComponent;
  let fixture: ComponentFixture<ListSoftwaresetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSoftwaresetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSoftwaresetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
