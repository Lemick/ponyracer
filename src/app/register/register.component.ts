import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  passwordForm: FormGroup;

  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  birthYearCtrl: FormControl;
  confirmPasswordCtrl: FormControl;

  registrationFailed: boolean;

  constructor(formBuilder: FormBuilder, private userService: UserService, private router: Router) {

    this.loginCtrl = formBuilder.control('', [Validators.required, Validators.minLength(3 )]);
    this.passwordCtrl = formBuilder.control('', Validators.required);
    this.birthYearCtrl = formBuilder.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);
    this.confirmPasswordCtrl = formBuilder.control('', Validators.required);

    this.passwordForm = formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    }, { validators: RegisterComponent.passwordMatch });

    this.userForm = formBuilder.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });
  }

  static passwordMatch(passwordGroup: FormGroup) {
    const password = passwordGroup.controls.password.value;
    const confirmPassword = passwordGroup.controls.confirmPassword.value;
    return password !== confirmPassword ? { matchingError: true } : null;
  }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.loginCtrl.value, this.passwordCtrl.value, this.birthYearCtrl.value).subscribe({
      error: err => this.registrationFailed = true,
      complete: () => this.router.navigate(['/'])
    });
  }
}
