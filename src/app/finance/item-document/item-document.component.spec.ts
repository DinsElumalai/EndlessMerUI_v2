import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDocumentComponent } from './item-document.component';

describe('ItemDocumentComponent', () => {
  let component: ItemDocumentComponent;
  let fixture: ComponentFixture<ItemDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
