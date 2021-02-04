import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup = this.formBuilder.group({
    username: [''],
    password: ['']
  });

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit(): void {
    let token = '';
    if (this.loginFormGroup !== null) {
      const usernameInput = this.loginFormGroup.get('username');
      const passwordInput = this.loginFormGroup.get('password');
      const username = usernameInput?.value;
      const password = passwordInput?.value;
      if (username !== null && username !== undefined && typeof username === 'string'
      && password !== null && password !== undefined && typeof password === 'string') {
        this.loginService.login(username, password).subscribe(
          result => {
            console.log(result.jwt);
            token = result.jwt;
          }
        );
      }
    }
    setTimeout(() => {
      if (token !== '') {
        this.router.navigate(['/employeePortal']);
      } else {
        this.router.navigate(['/failedLogin']);
      }
    }, 5000);
  }

}
