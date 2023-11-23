import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
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
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { environment } from 'src/environments/environment';

import {
  PaddleClass,
  SimplifiedClass,
} from '../../interfaces/paddle-class.interface';
import { ClassesService } from '../../services/classes.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, TranslateModule],
})
export class ClassFormComponent implements OnInit, OnDestroy {
  availableHours = signal<string>('08,09,10,11,12,13,14,15,16,17,18,19,20,21');
  form = signal<FormGroup>(null as any);
  localLanguage: string;
  minDate: string;
  notAvailableClasses = signal<SimplifiedClass[]>([]);
  phoneNumber = environment.phoneNumber;
  private readonly origianlHours = '08,09,10,11,12,13,14,15,16,17,18,19,20,21';
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private _alertService: AlertService,
    private _classesService: ClassesService,
    private _fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.minDate = this.getMinDate();
    this.localLanguage = this._translateService.currentLang;
    this.setClasses();
    this.initForm();
    this.filterAvailableHours();
  }

  onSubmit(): void {
    this._alertService.showAlert({
      header: 'form.header',
      message: 'form.message',
      confirmHandler: async () => {
        try {
          await this._classesService.createClass(this.form().value);

          this._toastService.showToast({
            message: 'form.class.created',
          });

          this.setClasses();
          this.initForm();
          this.filterAvailableHours();
          const response = await this._notificationsService.sendNotification(
            'New Class',
            JSON.stringify(this.form().value)
          );

          console.log(response);
        } catch (error) {
          console.error(error);
          this._toastService.showToast({
            message: 'form.class.error',
          });
        }
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

  private async setClasses(): Promise<void> {
    const data = await this._classesService.getClasses();
    this.notAvailableClasses.set(
      this._classesService.transformClasses(data).map((el: PaddleClass) => ({
        backgroundColor: '#c8e5d0',
        date: el.date.slice(0, 10),
        hour: el.date.slice(11, 13),
      }))
    );
  }

  private filterAvailableHours(): void {
    this.form()
      .get('date')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: string) => {
        const date = value.slice(0, 10);
        const todayHours = this.notAvailableClasses()
          .filter((el) => el.date.slice(0, 10) === date)
          .map((el) => el.hour)
          .join();

        const uniqueHours = this.deleteDuplicatedOnes(
          this.origianlHours,
          todayHours
        );
        this.availableHours.set(uniqueHours);
      });
  }

  private deleteDuplicatedOnes(string1: string, string2: string): string {
    // Convert the strings into arrays by splitting them at commas and trimming spaces
    const array1 = string1.split(',').map((item) => item.trim());
    const array2 = string2.split(',').map((item) => item.trim());
    // Filter elements from the first array that are not present in the second array
    const newArray = array1.filter((item) => !array2.includes(item));
    // Join the filtered elements into a new string separated by commas
    const newString = newArray.join(',');

    return newString;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
