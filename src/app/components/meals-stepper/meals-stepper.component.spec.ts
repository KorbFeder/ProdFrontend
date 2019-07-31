import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsStepperComponent } from './meals-stepper.component';

describe('MealsStepperComponent', () => {
  let component: MealsStepperComponent;
  let fixture: ComponentFixture<MealsStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
