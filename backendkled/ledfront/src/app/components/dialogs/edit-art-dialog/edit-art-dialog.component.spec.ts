import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtDialogComponent } from './edit-art-dialog.component';

describe('EditArtDialogComponent', () => {
  let component: EditArtDialogComponent;
  let fixture: ComponentFixture<EditArtDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArtDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
