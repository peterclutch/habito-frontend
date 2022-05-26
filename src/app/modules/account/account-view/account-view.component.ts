import {Component, OnInit} from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { Account } from '../../../shared/model/account.model';
import { AccountService } from '../../../core/auth/account.service';
import { AvatarSize } from '../../../shared/component/avatar/avatar.component';
import { ButtonType } from '../../../shared/directive/button/button.directive';

@Component({
  selector: 'ha-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  account: Account | null = null;
  avatarSize = AvatarSize
  buttonType = ButtonType

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

}
