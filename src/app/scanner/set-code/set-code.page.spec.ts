import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetCodePage } from './set-code.page';

describe('SetCodePage', () => {
  let component: SetCodePage;
  let fixture: ComponentFixture<SetCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
