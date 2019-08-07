import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FoodInterface } from 'src/app/core/models/food-interface';
import { FoodService } from 'src/app/core/services/food.service';

@Component({
  selector: 'app-custom-food',
  templateUrl: './custom-food.component.html',
  styleUrls: ['./custom-food.component.scss']
})
export class CustomFoodComponent implements OnInit {
  public oldFood: FoodInterface[] = null;

  constructor(public dialogRef: MatDialogRef<CustomFoodComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private food: FoodService) { }

  ngOnInit() {
  }

  public searchForFood(name: string) {
    this.food.getOwnFoodByName(name).subscribe((result) => {
      this.oldFood = result;
    });
  }
  
  public foodChosen(value) {
    value.id = null;
    this.data = value;
  }
}
