import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: {login: string, password: string} = {
    login: '',
    password: ''
  };

  authenticationFailed: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  authenticate() {
    this.userService.authenticate(this.credentials).subscribe({
      next: value => {
        this.authenticationFailed = false;
        this.router.navigate(['/']);
      },
      error: err => {
        this.authenticationFailed = true;
      }
    });
  }
}
