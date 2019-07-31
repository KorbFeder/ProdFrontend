import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNutrOverviewComponent } from './daily-nutr-overview.component';

describe('DailyNutrOverviewComponent', () => {
  let component: DailyNutrOverviewComponent;
  let fixture: ComponentFixture<DailyNutrOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyNutrOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyNutrOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
