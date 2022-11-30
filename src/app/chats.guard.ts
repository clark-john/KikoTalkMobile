import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

type CanActivateReturn = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable({ providedIn: 'root' })
export class ChatsGuard implements CanActivate {
 	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateReturn {
 		return true;
 	}	
}
