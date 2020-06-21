import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKatalogComponent } from './add-katalog.component';

describe('AddKatalogComponent', () => {
  let component: AddKatalogComponent;
  let fixture: ComponentFixture<AddKatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
