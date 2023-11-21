import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  standalone: true,
  imports: [IonicModule, TranslateModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./wellcome.component.scss'],
})
export default class WellcomeComponent {
  constructor(private _navController: NavController) {}

  onClickLogin(): void {
    this._navController.navigateForward('/auth');
  }

  onClickAboutMe(): void {
    this._navController.navigateForward('/about-me');
  }
}
