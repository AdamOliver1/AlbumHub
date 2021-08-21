


import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value === '111'
      ? null : { wrongColor: control.value };
}
