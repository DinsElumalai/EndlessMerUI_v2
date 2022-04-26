import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPerformanceRevisionComponent } from './list-performance-revision.component';

describe('ListPerformanceRevisionComponent', () => {
  let component: ListPerformanceRevisionComponent;
  let fixture: ComponentFixture<ListPerformanceRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPerformanceRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPerformanceRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
