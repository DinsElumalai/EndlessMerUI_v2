import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReptSeqVndrComponent } from './item-rept-seq-vndr.component';

describe('ItemReptSeqVndrComponent', () => {
  let component: ItemReptSeqVndrComponent;
  let fixture: ComponentFixture<ItemReptSeqVndrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemReptSeqVndrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemReptSeqVndrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
