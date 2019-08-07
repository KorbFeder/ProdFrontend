import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FoodInterface } from 'src/app/core/models/food-interface';
import { Subject, Observable } from 'rxjs';
import { SearchFoodService } from 'src/app/core/services/search-food.service';
import { NutrientInterface } from 'src/app/core/models/nutrient-interface';

@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.scss']
})
export class SearchFoodComponent implements OnInit {
  /** Emits when the add button gets pressed and the food is added */
  @Output()
  public foodChosen: EventEmitter<FoodInterface> = new EventEmitter();
  /** Observable that emits the food */
  public NutrientData$: Observable<NutrientInterface[]>;
  /** Is the item that is chosen when clicked to show details */
  private currentFood: FoodInterface;
  public weight = '';

  /** Wether the add button is disabled/enabled */
  public addButtonDisabled = true;

  /** The results of the search */
  public results: FoodInterface[];
  /** The subject thats sends the search reqeust to the search.service */
  public searchTerm$ = new Subject<{name: string, manufac: string}>();

  constructor(private search: SearchFoodService) {
    /** Search after the term as soon as it gets entered in the component. It emits the values to the search.service */
    this.search.search(this.searchTerm$).subscribe((result) => {
      this.results = result;
      this.addButtonDisabled = true;
    });
  }

  /**
   * Gets called when one of the results gets chosen, will enable the add button for clicking.
   * This function gets the Nutrients of the clicked food and displays them.
   */
  public itemChosen(result: FoodInterface) {
    this.addButtonDisabled = false;
    this.currentFood = result;
    this.results = this.results.filter(res => res === result);
    this.NutrientData$ = this.search.getNutr(result.NDB_No);
    this.NutrientData$.subscribe((rows) => {
      for (let row of rows) {
        if (row.NutrDesc.includes('Protein')) {
          this.currentFood.protein = row.Nutr_val;
        }
        if (row.NutrDesc.includes('Total lipid')) {
          this.currentFood.fat = row.Nutr_val;
        }
        if (row.NutrDesc.includes('Carbohydrate')) {
          this.currentFood.carb = row.Nutr_val;
        }
      }
    });
  }

  /**
   * This function gets called if the add button gets clicked, it will emit the added food.
   */
  public foodAdded() {
    this.currentFood.weight = Number(this.weight);
    this.foodChosen.emit(this.currentFood);

    // reset
    this.reset();
 }

  /**
   * function that gets triggered by the reset button
   */
  public reset() {
    this.results = null;
    this.addButtonDisabled = true;
  }

  ngOnInit() {
  }

}
