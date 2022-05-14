import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
    static fieldsAreEqual(fieldA: string, fieldB: string): ValidationErrors | null {
        return (control: AbstractControl) => {
            return control.get(fieldA)?.value === control.get(fieldB)?.value ? null : { fieldsAreEqual: true };
        };
    }
}
