import { Injectable } from '@angular/core';
import { FCM } from '@capacitor-community/fcm';
import { Capacitor, CapacitorHttp, HttpResponse } from '@capacitor/core';
import {
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private _authService: AuthService) {}
  async init(): Promise<void> {
    const isPushNotificationAvailable =
      Capacitor.isPluginAvailable('PushNotifications');

    if (isPushNotificationAvailable) {
      const result = await PushNotifications.requestPermissions();

      if (
        result.receive &&
        environment.adminId === this._authService.getUser().uid
      ) {
        PushNotifications.register().then(() => {
          FCM.subscribeTo({
            topic: 'classes',
          });
        });
      } else {
        console.error('PushNotifications: Request permissions failed.');
      }
    }

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('token: ', token);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('notification: ', notification);
      }
    );
  }

  sendNotification(title: string, body: string): Promise<HttpResponse> {
    return CapacitorHttp.post({
      url: 'https://fcm.googleapis.com/fcm/send',
      params: {},
      data: {
        notification: {
          title,
          body,
        },
        to: '/topics/classes',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${environment.serverKey}`,
      },
    });
  }
}
