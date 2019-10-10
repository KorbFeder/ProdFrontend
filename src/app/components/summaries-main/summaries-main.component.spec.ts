import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummariesMainComponent } from './summaries-main.component';

describe('SummariesMainComponent', () => {
  let component: SummariesMainComponent;
  let fixture: ComponentFixture<SummariesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummariesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummariesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
