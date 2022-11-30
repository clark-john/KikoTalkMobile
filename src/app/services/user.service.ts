import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type UserObject = {
  id: number,
  username: string
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }
  isUserExist(username: string): boolean {

    // this.http<>.get()

    return true;
  }
}
