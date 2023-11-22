import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { logOutOutline, logoWhatsapp } from 'ionicons/icons';

import { AuthService } from '../auth/services/auth.service';
import { ClassFormComponent } from './components/class-form/class-form.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, TranslateModule, RouterModule, ClassFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  constructor(
    private _authService: AuthService,
    private _navController: NavController
  ) {
    addIcons({ logOutOutline, logoWhatsapp });
  }

  async onLogout(): Promise<void> {
    try {
      await this._authService.logout();
      this._navController.navigateRoot('/auth');
    } catch (error) {
      console.error({ error });
    }
  }
}
