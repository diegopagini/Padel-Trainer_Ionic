import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

interface Toast {
  message: string;
  duration?: number;
  position?: Position;
}

type Position = 'top' | 'bottom' | 'middle';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private _toastController: ToastController,
    private _translateService: TranslateService
  ) {}

  async showToast({
    message,
    duration = 2000,
    position = 'top',
  }: Toast): Promise<void> {
    const toast = await this._toastController.create({
      message: this._translateService.instant(message),
      duration,
      position,
    });

    await toast.present();
  }
}
