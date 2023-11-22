import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { helpCircleOutline } from 'ionicons/icons';

@Component({
  templateUrl: './auth.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule],
})
export default class AuthComponent {
  constructor() {
    addIcons({ helpCircleOutline });
  }
}
