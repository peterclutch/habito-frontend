import { Component } from '@angular/core';
import { Routes } from '../../../routes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../../shared/model/account.model';
import { AccountService } from '../../../core/auth/account.service';
import { ButtonType } from '../../../shared/directive/button/button.directive';

@Component({
  selector: 'ha-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent {
  account: Account = this.route.snapshot.data.account;
  profileFormGroup: FormGroup = this.formBuilder.group({
    firstName: new FormControl(this.account?.firstName, [Validators.required]),
    lastName: new FormControl(this.account?.lastName, [Validators.required]),
    email: new FormControl({value: this.account?.email, disabled: true})
  });
  loading = false;
  buttonType = ButtonType;

  constructor(
      private formBuilder: FormBuilder,
      private accountService: AccountService,
      private router: Router,
      private route: ActivatedRoute,
  ) { }

  back(): void {
    this.router.navigate([Routes.accountView()]);
  }

  save(): void {
    this.loading = true;

    const accountToSave: Account = {
      ...this.account,
      firstName: this.profileFormGroup.value.firstName,
      lastName: this.profileFormGroup.value.lastName,
    };

    this.accountService.save(accountToSave).subscribe(
        () => {
          this.accountService.identity(true).subscribe(() => {
            this.router.navigate([Routes.accountView()]);
          });
        },
        (response) => {
          this.loading = false;
        }
    );
  }

}
