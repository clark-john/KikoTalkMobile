import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterEvent, Event } from '@angular/router';
import { filter } from 'rxjs';
// import { Animation } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  margin: string | null = 'm-[10px]';

  navigateToIndex(): void {
    this.router.navigateByUrl("/");
  } 

  ngOnInit(): void {
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => 
        e instanceof NavigationStart && 
        e instanceof NavigationEnd 
      )
    ).subscribe((e: RouterEvent) => {
      if (/^\/chats/.test(e.url)){
        this.margin = null;
      } else {
        this.margin = 'm-[10px]';        
      }
    })
  }

  // customAnimation = (baseEl: any, opts?: any) => {}
}
