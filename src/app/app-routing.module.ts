import { NgModule } from '@angular/core';
import { 
  PreloadAllModules, 
  RouterModule, 
  Routes, 
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn
} from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { NotfoundPage } from './notfound/notfound.page';
import { ChatsComponent, people } from './views/chats/chats.component';
import { ChatComponent } from './views/chat/chat.component';
import { ChatsGuard } from './chats.guard';

import { UserChat } from './views/chats/chats.component';

const user: ResolveFn<UserChat> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => people.filter(x => x.id === Number(route.params['id']))[0];

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'signup',
    component: SignupPage
  },
  {
    path: "chats",
    component: ChatsComponent,
    canActivate: [ChatsGuard]
  },
  {
    path: "chats/:id",
    component: ChatComponent,
    resolve: { user }
  },
  {
    path: '**',
    component: NotfoundPage
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
