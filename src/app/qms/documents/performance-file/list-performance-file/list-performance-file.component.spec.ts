import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPerformanceFileComponent } from './list-performance-file.component';

describe('ListPerformanceFileComponent', () => {
  let component: ListPerformanceFileComponent;
  let fixture: ComponentFixture<ListPerformanceFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPerformanceFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPerformanceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
