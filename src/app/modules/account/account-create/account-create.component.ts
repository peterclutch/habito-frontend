import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../core/auth/account.service';
import { Account } from '../../../shared/model/account.model';
import { Routes } from '../../../routes';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from '../../../shared/directive/button/button.directive';
import { CardSize } from '../../../shared/component/card/card.component';

@Component({
  selector: 'ha-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  accountFormGroup: FormGroup = this.formBuilder.group({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  loading = false;
  buttonType = ButtonType;
  cardSize = CardSize;

  constructor(
      private formBuilder: FormBuilder,
      private accountService: AccountService,
      private router: Router
  ) { }

  ngOnInit(): void {

  }

  back() {
    this.router.navigate([Routes.login()]);
  }

  create(): void {
    this.loading = true;
    const account: Account = {
      firstName: this.accountFormGroup.value.firstName,
      lastName: this.accountFormGroup.value.lastName,
      email: this.accountFormGroup.value.email,
      password: this.accountFormGroup.value.password.password
    };
    this.accountService.create(account).subscribe(
        () => {
          this.router.navigate([Routes.login()]);
        }, () => {
          this.loading = false;
        });
  }

  linkFormGroup(formGroup: FormGroup) {
    this.accountFormGroup.addControl('password', formGroup);
  }

}
