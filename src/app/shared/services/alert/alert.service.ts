import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

interface Alert {
  header: string;
  message: string;
  confirmHandler: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private _alertController: AlertController,
    private _translateService: TranslateService
  ) {}

  async showAlert({ header, message, confirmHandler }: Alert) {
    const alert = await this._alertController.create({
      header: this._translateService.instant(header),
      message: this._translateService.instant(message),
      buttons: [
        {
          role: 'cancel',
          text: this._translateService.instant('common.cancel'),
          handler: () => {},
        },
        {
          role: 'confirm',
          text: this._translateService.instant('common.ok'),
          handler: () => {
            confirmHandler();
          },
        },
      ],
    });

    await alert.present();
  }
}
