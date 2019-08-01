import { Component, OnInit, Input } from '@angular/core';
import { FoodInterface } from 'src/app/core/models/food-interface';

@Component({
  selector: 'app-display-food',
  templateUrl: './display-food.component.html',
  styleUrls: ['./display-food.component.scss']
})
export class DisplayFoodComponent implements OnInit {
  @Input()
  items: FoodInterface[];

  @Input()
  meal: string;

  public showDetails = false;
  public targetItem: FoodInterface = null;

  constructor() { }

  ngOnInit() {
  }

  public itemChosen(item: FoodInterface) {
    this.showDetails = true;
    this.targetItem = item;
  }
}
