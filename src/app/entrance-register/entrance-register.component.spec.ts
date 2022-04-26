import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceRegisterComponent } from './entrance-register.component';

describe('EntranceRegisterComponent', () => {
  let component: EntranceRegisterComponent;
  let fixture: ComponentFixture<EntranceRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntranceRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
