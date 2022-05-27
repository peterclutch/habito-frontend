import { Component } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../../shared/model/account.model';
import { AccountService } from '../../../core/auth/account.service';
import { AvatarSize } from '../../../shared/component/avatar/avatar.component';
import { ButtonType } from '../../../shared/directive/button/button.directive';
import { Routes } from '../../../routes';

@Component({
  selector: 'ha-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent {
  account: Account | null = this.route.snapshot.data.account;
  avatarSize = AvatarSize
  buttonType = ButtonType

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  edit(): void {
    this.router.navigate([Routes.accountEdit()]);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

}
