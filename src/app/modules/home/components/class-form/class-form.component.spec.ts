import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ClassFormComponent } from './class-form.component';

describe('ClassFormComponent', () => {
  let component: ClassFormComponent;
  let fixture: ComponentFixture<ClassFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, ClassFormComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
