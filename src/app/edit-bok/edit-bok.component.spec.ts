import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBokComponent } from './edit-bok.component';

describe('EditBokComponent', () => {
  let component: EditBokComponent;
  let fixture: ComponentFixture<EditBokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
