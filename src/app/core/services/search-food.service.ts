import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchFoodService {

  constructor(private api: ApiService) { }

  public search(terms: Observable<{name: string, manufac: string}>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.getFood(term.name, term.manufac))
    );
  }

  public getFood(name: string, manufac: string = null) {
    let requestString = '';
    if(manufac) {
      requestString = `/${manufac}`;
    }
    return this.api.get(`/nutr/food/${name}${requestString}`);
  }

  public getNutr(NDB_No: number) {
    return this.api.get(`/nutr/nutr/${NDB_No}`);
  }
}
