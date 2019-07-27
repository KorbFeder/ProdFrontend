import { Injectable, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { tap, shareReplay } from 'rxjs/operators';
import { AuthInterface } from '../models/auth-interface';
import { UserServiceService } from './user-service.service';
import { BehaviorSubject, timer, Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private loginTimer: Subscription;

  constructor(private api: ApiService,
              private userService: UserServiceService,
              private router: Router) {

    this.setTimer();

    this.isLoggedIn$.pipe(
      tap((value) => {
        if (value === false) {
          this.router.navigate(['/login']);
        }
      })
    ).subscribe();
  }

  public login(username, password) {
    return this.api.post('/login', {username, password}).pipe(
      tap(res => this.setSession(res, username)),
      shareReplay()
    );
  }

  private setTimer() {
    const expiration = localStorage.getItem('expiresAt');
    const expMoment = moment(JSON.parse(expiration));

    if (moment().isBefore(expMoment)) {

      this.isLoggedIn$.next(true);

      const diff = expMoment.diff(moment());

      this.setUser();

      this.loginTimer = timer(diff).subscribe(() => {
        this.logout();
      });
    }
  }

  public register(user: AuthInterface) {
    return this.api.post('/register', {user});
  }

  private setSession(authResult, username) {
    // timer that sets the subject to true and later to logs out if the time runs out

    localStorage.setItem('username', username);
    localStorage.setItem('userId', authResult.userId);
    localStorage.setItem('expiresAt', JSON.stringify(moment().add(authResult.expiresIn, 'second')));
    localStorage.setItem('id_token', authResult.idToken);

    this.setTimer();
    this.setUser();
  }

  public logout() {
    this.userService.setUser('', null);
    if (this.isLoggedIn$.value !== false) {
      this.isLoggedIn$.next(false);
    }
    this.loginTimer.unsubscribe();

    localStorage.removeItem('username');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('id_token');
    localStorage.removeItem('userId');
  }

  private setUser() {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');

    this.userService.setUser(username, userId);
  }

  public isLoggedIn() {
    return this.isLoggedIn$.value;
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
  ngOnDestroy(): void {
    this.isLoggedIn$.unsubscribe();
    this.loginTimer.unsubscribe();
  }
}
