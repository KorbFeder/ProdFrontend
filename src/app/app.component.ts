import { Component } from '@angular/core';
import { UserServiceService } from './core/services/user-service.service';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public username$;

  constructor(private userService: UserServiceService,
              private auth: AuthService,
              private router: Router) {
    this.username$ = this.userService.user$;
    this.username$.subscribe((res) => console.log(res));
  }

  logOut() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  logIn() {
    this.router.navigate(['/login']);
  }
}
