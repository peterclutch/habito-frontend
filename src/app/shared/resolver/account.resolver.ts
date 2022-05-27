import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountService } from '../../core/auth/account.service';
import { Account } from "../model/account.model";
import { EMPTY, Observable } from 'rxjs';
import { Routes } from "../../routes";
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountResolver implements Resolve<Account> {
    constructor(
        private accountService: AccountService,
        private router: Router
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account> {
        // @ts-ignore
        return this.accountService.identity().pipe(catchError(() => {
                this.router.navigate([Routes.error()]);
                return EMPTY;
            })
        );
    }
}
