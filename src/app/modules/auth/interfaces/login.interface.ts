import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface LoginForm {
  email: (
    | string
    | ((control: AbstractControl<string, string>) => ValidationErrors | null)[]
  )[];
  keep: (
    | boolean
    | ((control: AbstractControl<boolean, boolean>) => ValidationErrors | null)
  )[];
  password: (
    | string
    | ((control: AbstractControl<string, string>) => ValidationErrors | null)[]
  )[];
}
