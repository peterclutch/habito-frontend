import { Component } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ha-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

}
