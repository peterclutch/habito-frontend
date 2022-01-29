import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountService } from '../../core/auth/account.service';
import { Account } from "../model/account.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AccountResolver implements Resolve<Account | null> {
  constructor(
    private accountService: AccountService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account | null> {
    return this.accountService.identity();
  }
}
