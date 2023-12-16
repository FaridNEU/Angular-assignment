import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private usersFilePath = 'assets/USERS.json';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersFilePath);
  }

  registerUsers(data : any) : Observable<any> {
    return this.http.put(this.usersFilePath, data);
  }

  updateUser(loggedInUser : any, updatedUser : any) : Observable<any> {
    return this.http.put(this.usersFilePath, { ...loggedInUser, ...updatedUser });
  }

  //deleteUser(user : any) : Observable<any> {
    //return ;
  //}
}
