import { FoodInterface } from './food-interface';

export interface DailyNutrientInterface {
    id?: number;
    dayNr: Date;
    fatGoal: number;
    carbGoal: number;
    proteinGoal: number;
    fat: number;
    carb: number;
    protein: number;
    foods: FoodInterface[];
}
