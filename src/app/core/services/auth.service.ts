import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';
import { AuthInterface } from '../models/auth-interface';
import { UserServiceService } from './user-service.service';
import { BehaviorSubject, timer } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private loginTimer;

  constructor(private api: ApiService,
              private userService: UserServiceService,
              private router: Router) {
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
      tap(res => this.setSession(res)),
      tap(res => {
        if (res.userId) {
          this.userService.setUser(username, res.userId);
        }
      }),
      shareReplay()
    );
  }

  public register(user: AuthInterface) {
    return this.api.post('/register', {user});
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    // timer to trigger a login false after the given time
    this.isLoggedIn$.next(true);
    this.loginTimer = timer(1000 * authResult.expiresIn);
    this.loginTimer.subscribe(() => {
      this.isLoggedIn$.next(false);
      this.userService.setUser('', null);
    });

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    this.userService.setUser('', null);
    this.isLoggedIn$.next(false);
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public isLoggedIn() {
    const isLoggedIn = moment().isBefore(this.getExpiration());
    if (!isLoggedIn) {
      this.userService.setUser('', null);
    }
    return isLoggedIn;
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
