import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FoodInterface } from 'src/app/core/models/food-interface';
import { Subject } from 'rxjs';
import { SearchFoodService } from 'src/app/core/services/search-food.service';

@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.scss']
})
export class SearchFoodComponent implements OnInit {
  @Output()
  foodChosen: EventEmitter<FoodInterface> = new EventEmitter();

  public results: FoodInterface[];
  public searchTerm$ = new Subject<{name: string, manufac: string}>();

  constructor(private search: SearchFoodService) {
    this.search.search(this.searchTerm$).subscribe((result) => {
      this.results = result;
      console.log({result});
    });
  }

  ngOnInit() {
  }

}
