import { Component } from '@angular/core';
import { AccountService } from '../../../core/auth/account.service';
import { Account } from '../../../shared/model/account.model';
import { Routes } from '../../../routes';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from '../../../shared/directive/button/button.directive';
import { CardSize } from '../../../shared/component/card/card.component';
import { LoginService } from '../../login/login.service';

@Component({
    selector: 'ha-account-create',
    templateUrl: './account-create.component.html',
    styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent {

    accountFormGroup: FormGroup = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
    });
    loading = false;
    buttonType = ButtonType;
    cardSize = CardSize;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private router: Router,
        private loginService: LoginService
    ) { }

    back() {
        this.router.navigate([Routes.login()]);
    }

    create(): void {
        this.loading = true;
        const account: Account = {
            firstName: '',
            lastName: '',
            email: this.accountFormGroup.value.email,
            password: this.accountFormGroup.value.password.password
        };

        this.accountService.create(account).subscribe(
            () => {
                this.loginService.login({ username: account.email, password: account.password || ''}).subscribe(
                    () => {
                        this.router.navigate(['']);
                    },
                    () => {
                        // TODO something went wrong
                        this.loading = false;
                    }
                );
            }, () => {
                this.loading = false;
            });
    }

    linkFormGroup(formGroup: FormGroup) {
        this.accountFormGroup.addControl('password', formGroup);
    }

}
