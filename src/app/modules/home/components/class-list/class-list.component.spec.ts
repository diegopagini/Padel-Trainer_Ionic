import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseApp } from '@angular/fire/app';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

import { ClassesService } from '../../services/classes.service';
import { ClassListComponent } from './class-list.component';

@Injectable()
class MockAuthService extends AuthService {
  override getUser() {
    return {
      uid: 'test',
    } as any;
  }
}

@Injectable()
class MockClassesService extends ClassesService {
  override getClasses() {
    return Promise.resolve({} as any);
  }

  override transformClasses() {
    return [];
  }
}

describe('ClassListComponent', () => {
  let component: ClassListComponent;
  let fixture: ComponentFixture<ClassListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, ClassListComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: ClassesService,
          useClass: MockClassesService,
        },
        {
          provide: FirebaseApp,
          useValue: () => {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
