import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { AuthInterface } from '../models/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  public login(username, password) {
    return this.api.post('/login', {username, password}).pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    );
  }

  public register(user: AuthInterface) {
    return this.api.post('/register', {user});
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
