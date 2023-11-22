import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

import { PaddleClass } from '../../interfaces/paddle-class.interface';
import { ClassesService } from '../../services/classes.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassListComponent implements OnInit {
  classes = signal<PaddleClass[]>([]);

  constructor(
    private _authService: AuthService,
    private _classesService: ClassesService
  ) {}

  ngOnInit(): void {
    this.getClassesById();
  }

  private async getClassesById(): Promise<void> {
    const user = this._authService.getUser();
    const data = await this._classesService.getClasses();
    const classes = this._classesService
      .transformClasses(data)
      .filter((el) => el.user.id === user.uid)
      .map((item) => ({ ...item, finished: this.checkClassFinished(item) }));
    this.classes.set(classes);
  }

  private checkClassFinished(item: PaddleClass): boolean {
    const date = new Date(item.date);
    const now = new Date();
    return date > now;
  }
}
