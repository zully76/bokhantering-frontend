import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoksComponent } from './boks.component';

describe('BoksComponent', () => {
  let component: BoksComponent;
  let fixture: ComponentFixture<BoksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
