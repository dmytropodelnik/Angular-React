import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class EditArticleGuard implements CanActivate {

  constructor(private authService: AuthorizationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        if (this.authService.getLogCondition() == false) {
          this.router.navigate(['/welcome']);
          return false;
        }

        return true;
    }
}
