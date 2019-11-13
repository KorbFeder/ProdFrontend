import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingsPlan } from '../models/trainings-plan-interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FitService {
  constructor(private api: ApiService) {}

  public get(phase: string = null, day: string = null): Observable<TrainingsPlan[]> {
    if (phase === null && day === null) {
      return this.api.get('/fit');
    } else {
      return this.api.get(`/fit/${phase}/${day}`);
    }
  }

  public save(trainingsPlans: TrainingsPlan[]): Observable<TrainingsPlan[]> {
    return this.api.post('/fit', trainingsPlans);
  }

  public update(trainingsPlans: TrainingsPlan[]): Observable<TrainingsPlan[]> {
    return this.api.put('/fit', trainingsPlans);
  }

  public delete(phase: string, day: string): Observable<number> {
    return this.api.delete(`/fit/${phase}/${day}`);
  }
}
