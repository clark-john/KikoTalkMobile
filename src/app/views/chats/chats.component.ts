import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Dialog } from '@capacitor/dialog';
import { RefresherCustomEvent } from '@ionic/angular';
import gsap from 'gsap';
import { UserService } from 'src/app/services/user.service';

// fake data
export type UserChat = {
  id: number,
  img: string,
  isSent?: boolean,
  name: string,
  recentMessage: string,
  isRead?: boolean,
	invertPicOnDark?: boolean
};

export const people: UserChat[] = [
	{
		img: "https://cdn-icons-png.flaticon.com/512/7718/7718992.png",
		name: "group ",
		recentMessage: "",
		id: 2,
		invertPicOnDark: true
	},
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
  },
  {
    img: "https://avatars.githubusercontent.com/u/70015878?v=4",
    isSent: false,
    name: "Clark johnny sins",
    recentMessage: "jsdkfndkfjsdfnjksdf",
    id: 3378,
    isRead: true
  },
];

@Component({
  templateUrl: './chats.component.html',
  // styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  platform = Capacitor.getPlatform();

  people = people;
  filteredPeople = this.people;
	meData!: any;

  constructor(private router: Router, private users: UserService) { }

  ngOnInit() {
		this.meData = this.users.getCurrentUser();
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
    navigator.vibrate(100);
  }

  handleRefresh(event: Event){
    setTimeout(() => {
      (event as RefresherCustomEvent).target.complete();
    }, 1000);
  }

  logoutUser(): void {
    if (this.platform !== "web" && this.platform === 'android'){
      Dialog.alert({
        title: "KikoTalk",
        message: "Are you sure?"
      }).then(() => {});
    } else {
      if (confirm("Are you sure?")) {
				localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
  }

  testSearchUser = (e: Event) => {
    this.filteredPeople = this.people.filter(x => x.name.toLowerCase().includes((e as CustomEvent).detail.target.value.toLowerCase()));
  }
}
