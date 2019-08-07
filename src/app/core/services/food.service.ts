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

  /**
   * This function gets a daily Nutrition plan, for the given date.
   * 
   * @param date Date
   */
  public getDaily(date: Date) {
    return this.api.get(`/daily/${date}`);
  }

  /**
   * This function saves a daily nutrient in the database.
   * 
   * @param dailyNutr DailyNutrientInterface
   */
  public saveDaily(dailyNutr: DailyNutrientInterface) {
    return this.api.post('/daily', dailyNutr);
  }

  /**
   * This function updates a daily Nutrient plan
   * 
   * @param dailyNutr DailyNutrientInterface
   */
  public updateDaily(dailyNutr: DailyNutrientInterface) {
    return this.api.put('/daily', dailyNutr);
  }

  /**
   * This function returns a food. It needs the day_id to which day the food belongs to, it will 
   * get all the foods for the day.
   * 
   * @param day_id string
   */
  public getOwnFood(day_id: string) {
    const httpParams = new HttpParams().append('day_id', day_id);
    return this.api.get(`/ownfood/`, httpParams);
  }

  /**
   * Saves the food in the database. 
   * 
   * @param food food interface
   */
  public saveOwnFood(food: FoodInterface) {
    return this.api.post('/ownfood', food);
  }

  /**
   * deletes a food depending on its id.
   * 
   * @param id string
   */
  public deleteOwnFood(id: string) {
    return this.api.delete(`/ownfood/${id}`);
  }

  /**
   * This gets a food from the database which holds all foods, to this database there will never be any
   * saves, only get requests.
   * 
   * @param name string
   * @param manufac string
   */
  public getFood(name: string, manufac: string = null) {
    if(manufac) {
      return this.api.get(`/nutr/food/${name}/${manufac}`);
    } else {
      return this.api.get(`/nutr/food/${name}`);
    }
  }

  /**
   * Gets the Nutrients corresponding to the id of an food.
   * 
   * @param id number
   */
  public getNutrition(id) {
    return this.api.get(`/nutr/nutr/${id}`);
  }
}
