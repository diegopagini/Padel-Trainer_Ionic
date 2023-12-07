import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import WellcomeComponent from './wellcome.component';

describe('WellcomeComponent', () => {
  let component: WellcomeComponent;
  let fixture: ComponentFixture<WellcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        WellcomeComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WellcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
