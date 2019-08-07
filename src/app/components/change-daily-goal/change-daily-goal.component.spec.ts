import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDailyGoalComponent } from './change-daily-goal.component';

describe('ChangeDailyGoalComponent', () => {
  let component: ChangeDailyGoalComponent;
  let fixture: ComponentFixture<ChangeDailyGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDailyGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDailyGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
