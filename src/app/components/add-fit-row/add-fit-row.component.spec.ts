import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFitRowComponent } from './add-fit-row.component';

describe('AddFitRowComponent', () => {
  let component: AddFitRowComponent;
  let fixture: ComponentFixture<AddFitRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFitRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFitRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
