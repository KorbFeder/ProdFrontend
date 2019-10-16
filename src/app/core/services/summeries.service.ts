import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { SummariesInterface } from '../models/summaries-interface';
import { Store } from '@ngrx/store';
import { LOAD, LOADSINGLE, ADD, EDIT, REMOVE } from 'src/app/store/summaries.actions';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SummeriesService {

  constructor(
    private api: ApiService,
    private store: Store<{summaries: SummariesInterface[]}>
  ) { }

  public get(folderId: string, id: string = null): Observable<SummariesInterface[]> {
    if (id === null) {
      return this.api.get(`/summaries/${folderId}`).pipe(
        tap((result: SummariesInterface[]) => this.store.dispatch(LOAD({summaries: result})))
      );
    } else {
      return this.api.get(`/summaries/${folderId}/${id}`).pipe(
        tap((result: SummariesInterface[]) => this.store.dispatch(LOADSINGLE({summaries: result[0]})))
      );
    }
  }

  public save(summaries: SummariesInterface): Observable<SummariesInterface[]> {
    return this.api.post('/summaries', summaries).pipe(
      tap((result: SummariesInterface[]) => this.store.dispatch(ADD({summaries: result[0]})))
    );
  }

  public update(summaries: SummariesInterface): Observable<SummariesInterface[]> {
    return this.api.put('/summaries', summaries).pipe(
      tap((result: SummariesInterface[]) => this.store.dispatch(EDIT({summaries: result[0]})))
    );
  }

  public delete(id: string): Observable<number> {
    return this.api.delete(`/summaries/${id}`).pipe(
      tap((result) => this.store.dispatch(REMOVE({id: result.body})))
    );
  }
}
