import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FoodInterface } from 'src/app/core/models/food-interface';

@Component({
  selector: 'app-display-food',
  templateUrl: './display-food.component.html',
  styleUrls: ['./display-food.component.scss']
})
export class DisplayFoodComponent implements OnInit, OnChanges {

  @Input()
  items: FoodInterface[];

  @Input()
  meal: string;

  @Output()
  deleteEvent: EventEmitter<FoodInterface> = new EventEmitter();

  public showDetails = false;
  public targetItem: FoodInterface = null;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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
