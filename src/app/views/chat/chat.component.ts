import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, Event, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { isNull } from 'lodash';
import { WS_CHAT_URL } from 'src/app/constants';
import { UserChat } from '../chats/chats.component';
import { UserService } from 'src/app/services/user.service';

/*
interface Message {
	message: string;
	room_id: number
}

interface WsMessage {
	command: number;
	message: Message;
}

interface Chat {
  chat: string;
  authorId?: number;
  isYourChat: boolean;
}*/

@Component({ templateUrl: './chat.component.html' })
export class ChatComponent implements OnInit, OnDestroy {
	isNull = isNull;

  user?: UserChat;
  chats: {	[key: string]: any }[] | null = null;
  num?: number;
	chatElement!: HTMLDivElement;
	isShowName = false;
	ws!: WebSocket;
	wsInterval?: ReturnType<typeof setInterval>;
	meData!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
		private component: ElementRef<HTMLDivElement>,
		private users: UserService
  ) {}

  navigateTo(path: string){
		this.router.navigateByUrl(path);
  }

	ngOnDestroy(): void {
		delete this.wsInterval;
	}

  ngOnInit(): void {
		this.meData = this.users.getCurrentUser();

		this.chatElement = this.component.nativeElement.querySelector(".chats") ?? document.createElement("div");

		this.chatElement.addEventListener("scroll", () => {
			this.revealName();
		});

    this.route.data.subscribe(x => {
      this.user = x['user'];
    });

    this.route.params.subscribe(x => {
      this.num = x['id'];
    });

		this.router.events.pipe(
			filter((e: Event): e is RouterEvent => e instanceof NavigationStart)
		).subscribe(x => {
			if (x.url.match(/^\/chats\/\d*/)) {
				this.scrollChat();
			}
		});

		if (this.num?.toString().match(/2/)) {
			console.log("clark");
			const token = localStorage.getItem("token") ?? "";
			this.ws = new WebSocket(WS_CHAT_URL(token));

			this.wsInterval = setInterval(() => {
				this.ws.send(JSON.stringify({ command: 6000 }));
			}, 6000);

			this.ws.onmessage = e => {
				const chunk = JSON.parse(e.data);
				if (chunk.command === 5007){
					const chats = chunk.messages;
					chats.reverse();
					this.chats = chats;
					this.scrollChat();
				} else if (chunk.command === 5000){
					this.chats?.push({
						message: chunk.message,
						sender_id: chunk.sender_id
					});
				}
				console.log(chunk.command);
			};
			this.ws.onclose = () => {
				console.log("closed");
			};
		}
  }

  receiveMessage(e: string){
		setTimeout(() => {
			this.ws.send(JSON.stringify({ command: 5000, message: e }));
		}, 50);
		this.scrollChat();
  }

	scrollChat(){
		setTimeout(() => {
			this.chatElement.scroll({ top: 10**10, behavior: "smooth" });
		}, 4);
	}

	revealName(){
		if (this.chatElement.scrollTop > 110) {
			this.isShowName = true;
		} else {
			this.isShowName = false;
		}
	}
}
