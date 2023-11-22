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
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { environment } from 'src/environments/environment';

import { ClassesService } from '../../services/classes.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, TranslateModule],
})
export class ClassFormComponent implements OnInit {
  availableHours = '08,09,10,11,12,13,14,15,16,17,18,19,20,21';
  form = signal<FormGroup>(null as any);
  localLanguage: string;
  minDate: string;
  phoneNumber = environment.phoneNumber;

  constructor(
    private _alertService: AlertService,
    private _classesService: ClassesService,
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.minDate = this.getMinDate();
    this.localLanguage = this._translateService.currentLang;
    this.initForm();
  }

  onSubmit(): void {
    this._alertService.showAlert({
      header: 'form.header',
      message: 'form.message',
      confirmHandler: () => {
        this._toastService.showToast({
          message: 'form.class.created',
        });

        this.initForm();
      },
    });
  }

  private initForm(): void {
    this.form.set(
      this._fb.group({
        comment: [null],
        date: [this.minDate, [Validators.required]],
        phone: [null, [Validators.required, Validators.minLength(6)]],
      })
    );
  }

  private getMinDate(): string {
    let today = new Date();
    today.setHours(today.getHours() + 1);
    today.setHours(Math.ceil(today.getHours() + 1));
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today.toISOString().split('.')[0];
  }
}