import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';

@Component({
  templateUrl: 'home.page.html',
  // styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router) {}
  alertTest(): void {
    alert('Clark johnny sins')
  }
  ngOnInit(): void {
    gsap.from(".animate", {
      duration: .75,
      opacity: 0, 
      delay: 0.3, 
      stagger: 0.1,
      ease: "ease-in-out", 
      y: '100px'
    });
  }
  goTo(url: string): void {
    this.router.navigateByUrl(url);
  }
}
