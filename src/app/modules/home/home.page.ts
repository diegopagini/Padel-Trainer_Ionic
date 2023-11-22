import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  calendarOutline,
  listOutline,
  logOutOutline,
  logoWhatsapp,
  timeOutline,
} from 'ionicons/icons';

import { AuthService } from '../auth/services/auth.service';
import { ClassFormComponent } from './components/class-form/class-form.component';
import { ClassListComponent } from './components/class-list/class-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    ClassFormComponent,
    ClassListComponent,
    IonicModule,
    RouterModule,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  seeClaases = signal<boolean>(false);

  constructor(
    private _authService: AuthService,
    private _navController: NavController
  ) {
    addIcons({
      addCircleOutline,
      calendarOutline,
      listOutline,
      logOutOutline,
      logoWhatsapp,
      timeOutline,
    });
  }

  async onLogout(): Promise<void> {
    try {
      await this._authService.logout();
      this._navController.navigateRoot('/auth');
    } catch (error) {
      console.error({ error });
    }
  }

  toggleClassesView(): void {
    this.seeClaases.update((value: boolean) => !value);
  }
}
