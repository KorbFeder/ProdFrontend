import { Component, OnInit } from '@angular/core';
import { AuthInterface } from 'src/app/core/models/auth-interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public failed = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  public register(value) {
    if (value.email === '') {
      value.email = null;
    }
    // todo verify email
    value.emailVerified = 1;
    const user: AuthInterface = Object.assign({}, value);
    this.auth.register(user).subscribe(() => {
      this.router.navigate(['/login']);
    }, (error) => {
      this.failed = true;
    });
  }
}
