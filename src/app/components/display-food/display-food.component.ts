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

  private weight() {
    if (this.targetItem) {
      if (this.targetItem.weight === 0 || !this.targetItem.weight) {
        return 100;
      } else {
        return this.targetItem.weight;
      }
    } else {
      return 100;
    }
  }

  private calcWithWeight(num: number) {
    if (this.weight() !== 100) {
      num = num / (100 / this.weight());
    }
    return num;
  }
}
