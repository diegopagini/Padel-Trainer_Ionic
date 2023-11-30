import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  standalone: true,
  imports: [IonicModule, TranslateModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./wellcome.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class WellcomeComponent {
  images: string[] = ['1', '2', '3', '4', '5', '6', '8', '9', '10'];

  constructor(private _navController: NavController) {}

  onClickLogin(): void {
    this._navController.navigateForward('/auth');
  }

  onClickAboutMe(): void {
    this._navController.navigateForward('/about-me');
  }
}
