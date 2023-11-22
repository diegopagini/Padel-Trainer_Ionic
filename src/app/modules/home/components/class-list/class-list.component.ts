import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';

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
  isAdmin = signal<boolean>(false);
  user = signal<User>(null as any);

  constructor(
    private _authService: AuthService,
    private _classesService: ClassesService
  ) {}

  ngOnInit(): void {
    this.user.set(this._authService.getUser());
    this.isAdmin.set(environment.adminId === this.user().uid);
    this.getClassesById();
  }

  private async getClassesById(): Promise<void> {
    const data = await this._classesService.getClasses();
    const classes = this._classesService
      .transformClasses(data)
      .filter((el) => {
        // The admin can see all the classes.
        if (this.isAdmin()) return el;

        return el.user.id === this.user().uid;
      })
      .map((item) => ({ ...item, finished: this.checkClassFinished(item) }));

    this.classes.set(classes);
  }

  private checkClassFinished(item: PaddleClass): boolean {
    const date = new Date(item.date).getTime();
    const now = new Date().getTime();
    return date < now;
  }
}
