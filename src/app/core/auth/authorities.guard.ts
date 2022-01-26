import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AccountService } from './account.service';
import { Observable } from 'rxjs';
import { StateStorageService } from './state-storage.service';
import { map } from 'rxjs/operators';
import { Routes } from '../../routes';

@Injectable({ providedIn: 'root' })
export class AuthoritiesGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService, private stateStorageService: StateStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.identity().pipe(
      map(account => {
        if (account) {
          const authorities = route.data['authorities'];

          if (!authorities || authorities.length === 0 || this.accountService.hasAnyAuthority(authorities)) {
            return true;
          }

          if (isDevMode()) {
            console.error('User has not any of required authorities: ', authorities);
          }
          this.router.navigate(['accessdenied']);
          return false;
        }

        this.stateStorageService.storeUrl(state.url);
        this.router.navigate([Routes.login()]);
        return false;
      })
    );
  }
}