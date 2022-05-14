import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../core/auth/account.service';

@Component({
  selector: 'ha-account-activate',
  templateUrl: './account-activate.component.html',
  styleUrls: ['./account-activate.component.scss']
})
export class AccountActivateComponent implements OnInit {

  key: string | null = null;

  constructor(
      private route: ActivatedRoute,
      private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.key = params['key'];
      if (this.key != null) {
        this.accountService.activate(this.key).subscribe(() => 'lol')
      }
    });
  }

}
