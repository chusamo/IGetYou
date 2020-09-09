import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvalidPage } from './invalid.page';

describe('InvalidPage', () => {
  let component: InvalidPage;
  let fixture: ComponentFixture<InvalidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvalidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
