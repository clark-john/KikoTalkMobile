import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserChat } from '../chats/chats.component';

@Component({
  templateUrl: './chat.component.html',
  // styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  user?: UserChat;
  num?: number;
  constructor(
    private route: ActivatedRoute, 
    private router: Router
  ) {}
  
  navigateTo(path: string){
    this.router.navigateByUrl(path);
  }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.user = x['user'];
    });

    this.route.params.subscribe(x => {
      this.num = x['id'];
    });
  }
}
