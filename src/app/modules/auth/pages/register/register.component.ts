import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _navController: NavController,
    private _toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    try {
      const { user } = await this._authService.register(this.form.value);
      if (user.uid) this._navController.navigateForward(['/auth/login']);
    } catch (error: any) {
      console.error({ error });
      this._toastService.showToast({
        message: error?.code ? `${error.code}` : 'register.error',
      });
    }
  }
}
