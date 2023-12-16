import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedInUser: any ;
  updateForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.loadUsers();
    this.loggedInUser = this.authService.getLoggedInUser();
    this.updateForm = this.formBuilder.group({
      firstName: [this.loggedInUser?.firstName, Validators.required],
      lastName: [this.loggedInUser?.lastName, Validators.required],
      email: [this.loggedInUser?.email, [Validators.required, Validators.email]],
      password: [this.loggedInUser?.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  onUpdate(): void {
    if (this.updateForm.valid) {
      const updatedUserData = {
        _id: this.loggedInUser._id,
        username: this.loggedInUser.username,
        ...this.updateForm.value
      };
      this.authService.updateUser(updatedUserData);
      alert('Update successful!');
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid input';
    }
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.authService.deleteUser(this.loggedInUser._id);
      this.router.navigate(['/login']);
      alert('Delete successful!');
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
