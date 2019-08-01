import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FoodInterface } from 'src/app/core/models/food-interface';

@Component({
  selector: 'app-meals-stepper',
  templateUrl: './meals-stepper.component.html',
  styleUrls: ['./meals-stepper.component.scss']
})
export class MealsStepperComponent implements OnInit {
  @Output()
  public deleteOwnFood: EventEmitter<FoodInterface> = new EventEmitter();

  @Output()
  public foodChosen: EventEmitter<FoodInterface> = new EventEmitter();

  @Input()
  public addedFood: FoodInterface[];

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;

  public meals = ['Breakfast', 'Brunch', 'Lunch', 'Snack', 'Dinner', 'After Dinner Meal'];

  constructor(fb: FormBuilder) {
    this.firstFormGroup = fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = fb.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public itemChosen(event: any, meal) {
    event.meal = meal;
    this.foodChosen.emit(event);
  }

}
