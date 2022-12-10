import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CenterComponent } from './components/center/center.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';

import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { NotfoundPage } from './notfound/notfound.page';
import { ChatsComponent } from './views/chats/chats.component';
import { ChatComponent } from './views/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    SignupPage,
    NotfoundPage,
    HomePage,
    ChatsComponent,
    ChatComponent,
    CenterComponent,
    ChatboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    LazyLoadImageModule,
		HammerModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
