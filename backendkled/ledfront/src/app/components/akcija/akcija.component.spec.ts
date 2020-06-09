import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkcijaComponent } from './akcija.component';

describe('AkcijaComponent', () => {
  let component: AkcijaComponent;
  let fixture: ComponentFixture<AkcijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkcijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkcijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
