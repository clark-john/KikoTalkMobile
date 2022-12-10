import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LOGIN_URL } from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	email!: AbstractControl | null;
	password!: AbstractControl | null;
  router: Router;
	JSON = JSON;
  constructor(
		private r: Router,
		private http: HttpClient,
		private fb: FormBuilder
	) {
    this.router = r;
  }
	loginData = this.fb.group({
		email: ["", [Validators.email, Validators.required]],
		password: ["", Validators.required]
	})
	ngOnInit(): void {
		this.email = this.loginData.get("email");
		this.password = this.loginData.get("password");
	}
	loginUser(){
		const password = this.loginData.get("password");
		if (!this.loginData.get("email")?.errors) {
			this.http.post<{"token: ": string}>(LOGIN_URL, JSON.stringify(this.loginData.value)).pipe(
				catchError((err: HttpErrorResponse) => {
					let errRes: string;
					if (err.status === 401){ // unauthorized
						errRes = "Invalid credentials";
					} else if (err.status < 400) {
						errRes = "";
					} else {
						errRes = "Unknown error";
					}
					this.password?.setErrors({ password: "Wrong password or email" });
					return throwError(() => new Error(errRes));
				})
			).subscribe(x => {
				localStorage.setItem("token", x['token: ']);
				this.router.navigateByUrl("/chats");
			});
		} else {
			alert("has errors");
		}
	}
}
