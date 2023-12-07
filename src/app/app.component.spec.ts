import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { Device } from '@capacitor/device';
import { IonicModule } from '@ionic/angular';
import { Platform } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import config from 'capacitor.config';
import { getAuth } from 'firebase/auth';

import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { NotificationsService } from './shared/services/notifications/notifications.service';

@Injectable()
class MockNotificationsService extends NotificationsService {
  override init(): Promise<void> {
    return Promise.resolve();
  }
}

@Injectable()
class MockPlatform extends Platform {
  override ready() {
    return Promise.resolve('');
  }
}

@Injectable()
class MockAuthService extends AuthService {
  override getUser() {
    return {
      uid: 'test',
    } as any;
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        IonicModule,
        TranslateModule,
        AngularFireModule,
      ],
      providers: [
        {
          provide: NotificationsService,
          useClass: MockNotificationsService,
        },
        {
          provide: Platform,
          useClass: MockPlatform,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: FirebaseApp,
          useValue: {
            getProvider: () => {
              return 'test';
            },
          },
        },
        {
          provide: Device,
          useValue: {
            getLanguageCode: () => {
              return 'es';
            },
          },
        },
        {
          provide: getAuth,
          useValue: () => {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should init the CapacitorHttp Plugin', () => {
    const plugin = config.plugins!.CapacitorHttp!.enabled;
    component['initCapacitorHttp']();

    expect(plugin).toBeTruthy();
  });
});
