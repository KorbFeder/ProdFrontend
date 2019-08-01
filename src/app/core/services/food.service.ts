import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DailyNutrientInterface } from '../models/daily-nutrient-interface';
import { FoodInterface } from '../models/food-interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private api: ApiService) { }

  public getDaily(date: Date) {
    return this.api.get(`/daily/${date}`);
  }

  public saveDaily(dailyNutr: DailyNutrientInterface) {
    return this.api.post('/daily', dailyNutr);
  }

  public updateDaily(dailyNutr: DailyNutrientInterface) {
    return this.api.put('/daily', dailyNutr);
  }

  public getOwnFood(day_id: string) {
    const httpParams = new HttpParams().append('day_id', day_id);
    return this.api.get(`/ownfood/`, httpParams);
  }

  public saveOwnFood(food: FoodInterface) {
    return this.api.post('/ownfood', food);
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
