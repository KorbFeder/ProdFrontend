import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodInterface } from 'src/app/core/models/food-interface';

@Component({
  selector: 'app-display-food',
  templateUrl: './display-food.component.html',
  styleUrls: ['./display-food.component.scss']
})
export class DisplayFoodComponent implements OnInit {
  /** This is the food which got already chosen before */
  @Input()
  items: FoodInterface[];

  /** The current meal / state the stepper is in atm. Used to organize food in the right stepper step */
  @Input()
  meal: string;

  /** Event which gets emitted when a food gets chosen to be deleted */
  @Output()
  deleteEvent: EventEmitter<FoodInterface> = new EventEmitter();

  /** Variables for details, showDetails is, for wether the details are shown at all and target item is the item whose details are shown */
  public showDetails = false;
  public targetItem: FoodInterface = null;

  constructor() { }

  ngOnInit() {
  }

  /**
   * If an item form the list gets clicked at, to show the details of that food-item
   */
  public itemChosen(item: FoodInterface) {
    this.showDetails = true;
    this.targetItem = item;
  }

  /**
   * This is for showing the correct weight, since if no weight is specified by the user its assumed to be 100g
   */
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

  /**
   * This function is for calculating the values of column depending on the weight they would have at 100g
   *
   * @param num number
   */
  private calcWithWeight(num: number) {
    if (this.weight() !== 100) {
      num = num / (100 / this.weight());
    }
    return num;
  }
}
