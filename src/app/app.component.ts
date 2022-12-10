import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterEvent, Event } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  margin: string | null = 'm-[10px]';

  navigateToIndex(): void {
    this.router.navigateByUrl("/");
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent =>
        e instanceof NavigationStart || e instanceof NavigationEnd
      )
    ).subscribe((e: RouterEvent) => {
      if (e.url.startsWith("/chats")){
        this.margin = null;
      } else {
        this.margin = 'm-[10px]';
      }
    });
  }
}
