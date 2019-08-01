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
  @Output()
  public foodChosen: EventEmitter<FoodInterface> = new EventEmitter();
  public NutrientData$: Observable<NutrientInterface[]>;
  private currentFood: FoodInterface;
  public weight = '';

  public addButtonDisabled = true;

  public results: FoodInterface[];
  public searchTerm$ = new Subject<{name: string, manufac: string}>();

  constructor(private search: SearchFoodService) {
    this.search.search(this.searchTerm$).subscribe((result) => {
      this.results = result;
      this.addButtonDisabled = true;
    });
  }

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

  public foodAdded() {
    this.currentFood.weight = Number(this.weight);
    this.foodChosen.emit(this.currentFood);

    // reset
    this.results = null;
    this.addButtonDisabled = true;
  }

  public reset() {
    this.results = null;
    this.addButtonDisabled = true;
  }

  ngOnInit() {
  }

}
