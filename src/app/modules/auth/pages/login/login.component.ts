import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IonicModule, NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { helpCircleOutline } from 'ionicons/icons';

import { LoginForm } from '../../interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form = signal<FormGroup>(null as any);

  constructor(private _fb: FormBuilder, private _navController: NavController) {
    addIcons({ helpCircleOutline });
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    this.setPreferenses();

    this._navController.navigateForward('/home');
  }

  private async initForm(): Promise<void> {
    const [email, keep, password] = await Promise.all([
      Preferences.get({ key: 'email' }),
      Preferences.get({ key: 'keep' }),
      Preferences.get({ key: 'password' }),
    ]);

    this.form.set(
      this._fb.group<LoginForm>({
        email: [email?.value || null, [Validators.required, Validators.email]],
        keep: [Boolean(keep?.value) || false],
        password: [password?.value || null, [Validators.required]],
      })
    );
  }

  private async setPreferenses(): Promise<void> {
    const keepSession: boolean = this.form().get('keep')?.value;

    if (keepSession) {
      await Promise.all([
        Preferences.set({
          key: 'email',
          value: this.form().get('email')?.value,
        }),
        Preferences.set({
          key: 'password',
          value: this.form().get('password')?.value,
        }),
        Preferences.set({
          key: 'keep',
          value: this.form().get('keep')?.value,
        }),
      ]);

      return;
    }

    // If not.
    await Promise.all([
      Preferences.remove({ key: 'email' }),
      Preferences.remove({ key: 'password' }),
      Preferences.remove({ key: 'keep' }),
    ]);
  }
}
