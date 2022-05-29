import { Component, OnInit } from '@angular/core';
import { Account } from '../../shared/model/account.model';
import { AccountService } from '../../core/auth/account.service';

@Component({
  selector: 'ha-calendar',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  account: Account | null = null;

  constructor(
      private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });
  }
}
