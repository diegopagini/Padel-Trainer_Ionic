import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  provideRouter,
  RouteReuseStrategy,
  withViewTransitions,
} from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
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
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      // Firebase
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    ),
  ],
};
