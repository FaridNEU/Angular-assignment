import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.loadUsers();
  }

  onSubmit(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    const isLoggedIn = this.authService.login(username, password);

    if (!isLoggedIn) {
      this.errorMessage = 'Invalid username or password';
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

  register() : void {
    this.router.navigate(['/register']);
  }

}
