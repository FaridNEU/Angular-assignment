import { Injectable } from '@angular/core';
import { UserInfoService } from './user-info.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private usersFilePath = 'assets/USERS.json';

  users : any[] = []

  private loggedInUser : any =  this.getLoggedInUser();

  constructor(private userService: UserInfoService, private router:Router, private http: HttpClient) { }

  //Okey
  getLoggedInUsername() : any {
    if (this.isAuthenticated){
      return localStorage.getItem('loggedInUser');
    }
    return this.isAuthenticated;
  }
  //Okey
  getLoggedInUser() : any {
    const username = this.getLoggedInUsername();
    const users = JSON.parse(localStorage.getItem("Users") || '[]');
    for (const user of users) {
      if (user.username === username && this.isAuthenticated) {
        return user;
      }
    }
    return false;
  }
  //Okey
  login(username : string, password : string) : boolean {
    const users = JSON.parse(localStorage.getItem("Users") || '[]');
    for (const user of users) {
      if (user.username === username && user.password === password) {
        localStorage.setItem('loggedInUser', username);
        this.isAuthenticated = true;
        return true;
      }
    }
    return false;
  }
  //Okey
  logout() : void {
    localStorage.setItem('loggedInUser', '');
    this.isAuthenticated = false;
  }
  //Okey
  loadUsers(): void {
    const users = JSON.parse(localStorage.getItem("Users") || '[]');
    this.users = users;
  }
  //Okey
  registerUser(formData : {username: string, firstName: string, lastName: string, email: string, password: string}): any {

    const newUser = {
      _id: (this.users.length + 1).toString(),
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    };

    const users = JSON.parse(localStorage.getItem("Users") || '[]');
    newUser._id = (users.length + 1).toString();
    users.push(newUser);
    localStorage.setItem("Users", JSON.stringify(users));
  }
  //Okey
  isValidUsername(username : string) : boolean {
    const users = JSON.parse(localStorage.getItem("Users") || '[]');
    for (const user of users) {
      if (user.username === username) {
        return false;
      }
    }
    return true;
  }
  //?
  updateUser(updatedUserData: any) : void {
    this.loggedInUser =  this.getLoggedInUser();

    const users = JSON.parse(localStorage.getItem("Users") || '[]');
    const updatedUsers = users.map((user: any) => {
      if (user._id === updatedUserData._id) {
        return { ...user, ...updatedUserData };
      }
      return user;
    });
    localStorage.setItem("Users", JSON.stringify(updatedUsers));
  }

  deleteUser(userId: string): void {
    const users = JSON.parse(localStorage.getItem("Users") || '[]');
    const updatedUsers = users.filter((user: any) => user._id !== userId);
    localStorage.setItem("Users", JSON.stringify(updatedUsers));
  }
  
}
