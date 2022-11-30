import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Dialog } from '@capacitor/dialog';
import gsap from 'gsap';

// fake data
export type UserChat = {
  id: number,
  img: string,
  isSent: boolean,
  name: string,
  recentMessage: string,
  isRead?: boolean
};

export const people: UserChat[] = [
  {
    img: "https://pbs.twimg.com/profile_images/1483299450290569220/esd53WLV_400x400.jpg",
    isSent: true,
    name: "Clarker",
    recentMessage: "Yow pare musta kana dyan? hahahahahahhah",
    id: 234,
    isRead: true
  },
  {
    img: "/assets/dog.jpg",
    isSent: false,
    name: "Clarked",
    recentMessage: "haha",
    id: 140,
    isRead: false
  },
  {
    img: "/assets/icon/kikotalk.png",
    isSent: false,
    name: "Kikotalker",
    recentMessage: "Thanks for using KikoTalk!",
    id: 159,
    isRead: true
  },
  {
    img: "https://avatars.githubusercontent.com/u/70015878?v=4",
    isSent: true,
    name: "Clark",
    recentMessage: "Thanks for this amazing app!",
    id: 333,
    isRead: true
  }
];

@Component({
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  platform = Capacitor.getPlatform();

  people = people;
  filteredPeople = this.people;

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      gsap.from(".chat", {
        duration: .75,
        opacity: 0, 
        delay: 0.3, 
        stagger: 0.1,
        ease: "ease-in-out", 
        y: '100px'
      });
    }, 20);
  }

  goToChatById(id: number){  
    this.router.navigateByUrl(`/chats/${id}`);
    navigator.vibrate(100)
  }

  logoutUser(): void {    
    if (this.platform !== "web" && this.platform === 'android'){
      Dialog.alert({
        title: "KikoTalk",
        message: "Are you sure?"
      }).then(() => {});
    } else {
      if (confirm("Are you sure?")) {
        window.location.href = "/"
      }
    }
  }
  testSearchUser = (e: Event) => {
    this.filteredPeople = this.people.filter(x => x.name.toLowerCase().includes((e as CustomEvent).detail.target.value.toLowerCase()));
  }
}
