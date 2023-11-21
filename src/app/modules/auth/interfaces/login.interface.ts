import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface LoginForm {
  email: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
    | null
  )[];
  keep: boolean[];
  password: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
    | null
  )[];
}
