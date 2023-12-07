import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { provideDatabase } from '@angular/fire/database';
import {
  provideRouter,
  RouteReuseStrategy,
  withViewTransitions,
} from '@angular/router';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { environment } from 'src/environments/environment';

import { routes } from './app.routes';
import { httpLoaderFactory } from './helpers/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    // Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    // Angular
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(
      IonicModule.forRoot(),
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      // Firebase
      AngularFireModule.initializeApp(environment.firebaseConfig),
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideDatabase(() => getDatabase())
    ),
  ],
};
