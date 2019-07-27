import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthInterface } from 'src/app/core/models/auth-interface';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginData: AuthInterface;
  public unauthorized = false;
  public alreadyLoggedIn$;

  constructor(private auth: AuthService,
              private router: Router) {
    this.alreadyLoggedIn$ = this.auth.isLoggedIn$;
  }

  ngOnInit() {
  }

  public login(value) {
    this.auth.login(value.username, value.password).subscribe((user) => {
      if (this.auth.isLoggedIn()) {
        this.router.navigate(['/todos']);
      }
    }, (error) => {
      this.unauthorized = true;
    });
  }

  public register() {
    this.router.navigate(['/register']);
  }

}
