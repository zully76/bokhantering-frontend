import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBokComponent } from './add-bok.component';

describe('AddBokComponent', () => {
  let component: AddBokComponent;
  let fixture: ComponentFixture<AddBokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
