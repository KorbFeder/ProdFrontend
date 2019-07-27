import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public user$: BehaviorSubject<{username: string, userId: string}> = new BehaviorSubject({username: '', userId: null});

  constructor() { }

  setUser(username, userId) {
    this.user$.next({username, userId});
  }
}
