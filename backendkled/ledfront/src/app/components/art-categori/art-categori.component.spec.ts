import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtCategoriComponent } from './art-categori.component';

describe('ArtCategoriComponent', () => {
  let component: ArtCategoriComponent;
  let fixture: ComponentFixture<ArtCategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtCategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtCategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
