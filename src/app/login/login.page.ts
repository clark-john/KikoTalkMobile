import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = new FormControl('');
  router: Router;
  constructor(private r: Router) {
    this.router = r;
  }
  alertTest(){
    alert("haha")
  }
  ngOnInit() {
  }
}
