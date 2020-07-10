import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoslednjiKomadiComponent } from './poslednji-komadi.component';

describe('PoslednjiKomadiComponent', () => {
  let component: PoslednjiKomadiComponent;
  let fixture: ComponentFixture<PoslednjiKomadiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoslednjiKomadiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoslednjiKomadiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
