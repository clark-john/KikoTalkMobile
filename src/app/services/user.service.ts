import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* type UserObject = {
  id: number,
  username: string
}; */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  isUserExist(username: string): boolean {
    return true;
	}

	getCurrentUser(){
		return JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]));
	}
}
