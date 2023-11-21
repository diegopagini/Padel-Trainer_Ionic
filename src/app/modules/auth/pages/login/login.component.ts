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
import { Preferences } from '@capacitor/preferences';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form = signal<FormGroup>(null as any);

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    this.setPreferenses();
  }

  private async initForm(): Promise<void> {
    const [email, keep, password] = await Promise.all([
      Preferences.get({ key: 'email' }),
      Preferences.get({ key: 'keep' }),
      Preferences.get({ key: 'password' }),
    ]);

    this.form.set(
      this._fb.group({
        email: [email?.value || null, [Validators.required, Validators.email]],
        keep: [keep?.value || false],
        password: [password?.value || null, [Validators.required]],
      })
    );
  }

  private async setPreferenses(): Promise<void> {
    const keepSession = this.form().get('keep')?.value;
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
