import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchFoodService {

  constructor(private api: ApiService) { }

  /**
   * This will init the observable for searching, after the observable gets returned
   * someone can subscribe to it. It will emit the search results.
   * 
   * @param terms Observable
   */
  public search(terms: Observable<{name: string, manufac: string}>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.getFood(term.name, term.manufac))
    );
  }

  /**
   * The search http request, gets the foods from the food database.
   * 
   * @param name string
   * @param manufac string
   */
  public getFood(name: string, manufac: string = null) {
    let requestString = '';
    if (manufac) {
      requestString = `/${manufac}`;
    }
    return this.api.get(`/nutr/food/${name}${requestString}`);
  }

  /**
   * The http request for the nutrients to get the nutrients for a given food identifier.
   * 
   * @param NDB_No string
   */
  public getNutr(NDB_No: string) {
    return this.api.get(`/nutr/nutr/${NDB_No}`);
  }
}
