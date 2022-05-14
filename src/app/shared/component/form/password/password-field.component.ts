import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LabelType } from '../label/label.component';
import { CustomValidators } from '../../../validator/custom-validators';

@Component({
  selector: 'ha-password-field',
  templateUrl: 'password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent implements OnInit {
  passwordMinLength = 6;
  passwordMaxLength = 100;
  passwordFormGroup = this.formBuilder.group({
      password: new FormControl('', [
          Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength)
      ])
    }, { validators: [CustomValidators.fieldsAreEqual('password', 'confirmPassword')] }
  );
  informativeLabel = LabelType.INFORMATIVE;
  @Input() inline = true;
  @Output() linkToParent = new EventEmitter<FormGroup>(true);

  constructor(
      private formBuilder: FormBuilder,
  ) { }

  get passwordField() {
    return this.passwordFormGroup.get('password');
  }

  get confirmPasswordField() {
    return this.passwordFormGroup.get('confirmPassword');
  }

  get password(): string {
    return this.passwordField?.value;
  }

  set password(pass: string) {
    this.passwordField?.setValue(pass);
  }

  get confirmPassword(): string {
    return this.confirmPasswordField?.value;
  }

  set confirmPassword(pass: string) {
    this.confirmPasswordField?.setValue(pass);
  }

  ngOnInit() {
    this.linkToParent.emit(this.passwordFormGroup);
  }
}
