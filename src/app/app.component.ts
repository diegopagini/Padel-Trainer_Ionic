import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import config from 'capacitor.config';

import { NotificationsService } from './shared/services/notifications/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private _notificationsService: NotificationsService,
    private _platform: Platform,
    private _translateService: TranslateService
  ) {}
  ngOnInit(): void {
    this.setLanguage();
    this.initCapacitorHttp();
    this._notificationsService.init();
  }

  private setLanguage(): void {
    this._translateService.setDefaultLang('en');

    this._platform.ready().then(async () => {
      const languague = await Device.getLanguageCode();
      if (
        languague.value &&
        (languague.value.startsWith('en') || languague.value.startsWith('es'))
      )
        this._translateService.use(languague.value.slice(0, 2));
    });
  }

  private initCapacitorHttp(): void {
    config.plugins!.CapacitorHttp!.enabled = true;
  }
}
