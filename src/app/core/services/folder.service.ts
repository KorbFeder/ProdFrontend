import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SummariesInterface } from '../models/summaries-interface';
import { Observable } from 'rxjs';
import { LOAD, LOADSINGLE, ADD, EDIT, REMOVE } from 'src/app/store/folder.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FolderInterface } from '../models/folder-interface';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(
    private api: ApiService,
    private store: Store<{folder: FolderInterface[]}>
  ) { }

  public get(id: string = null): Observable<FolderInterface[]> {
    if (id) {
      return this.api.get(`/folder/${id}`).pipe(
        tap((result: FolderInterface[]) => this.store.dispatch(LOADSINGLE({folder: result[0]})))
      );
    } else {
      return this.api.get('/folder').pipe(
        tap((result: FolderInterface[]) => this.store.dispatch(LOAD({folder: result})))
      );
    }
  }

  public save(folder: FolderInterface): Observable<FolderInterface[]> {
    return this.api.post('/folder', folder).pipe(
      tap((result: FolderInterface[]) => this.store.dispatch(ADD({folder: result[0]})))
    );
  }

  public update(folder: FolderInterface): Observable<FolderInterface[]> {
    return this.api.put('/folder', folder).pipe(
      tap((result: FolderInterface[]) => this.store.dispatch(EDIT({folder: result[0]})))
    );
  }

  public delete(id: string): Observable<number> {
    return this.api.delete(`/summaries/${id}`).pipe(
      tap((result) => this.store.dispatch(REMOVE({id: result.body})))
    );
  }
}
