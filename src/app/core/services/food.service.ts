import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DailyNutrientInterface } from '../models/daily-nutrient-interface';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private api: ApiService) { }

  public getDaily(date: Date = null) {
    if (date) {
      return this.api.get(`/daily/${date}`);
    } else {
      return this.api.get(`/daily`);
    }
  }

  public saveDaily(dailyNutr: DailyNutrientInterface) {
    return this.api.post('/daily', dailyNutr);
  }

  public updateDaily(dailyNutr: DailyNutrientInterface) {
    return this.api.put('/daily', dailyNutr);
  }

  public getOwnFood(name: string = null) {
    if (name) {
      return this.api.get(`/ownfood/${name}`);
    } else {
      return this.api.get(`/ownfood`);
    }
  }

  public getFood(name: string, manufac: string = null) {
    if(manufac) {
      return this.api.get(`/nutr/food/${name}/${manufac}`);
    } else {
      return this.api.get(`/nutr/food/${name}`);
    }
  }

  public getNutrition(id) {
    return this.api.get(`/nutr/nutr/${id}`);
  }
}
