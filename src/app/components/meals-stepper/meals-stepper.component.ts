import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-meals-stepper',
  templateUrl: './meals-stepper.component.html',
  styleUrls: ['./meals-stepper.component.scss']
})
export class MealsStepperComponent implements OnInit {
  public meals = ['Breakfast', 'Brunch', 'Lunch', 'Snack', 'Dinner', 'After Dinner Meal'];

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;

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

  public itemChosen(event: any) {
    console.log({event});
  }

}
