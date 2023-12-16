import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.authService.loadUsers();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      if(this.authService.isValidUsername(this.registerForm.value.username)){
        this.authService.registerUser(this.registerForm.value);
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Username Exist';
      }
    } else {
      this.errorMessage = 'Invalid input';
    }
  }


}
