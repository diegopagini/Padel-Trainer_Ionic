import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface RegisterForm {
  email: (
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
    | null
  )[];
  password: (
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
    | null
  )[];
  phone: (
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
    | null
  )[];
}
