import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistrationComponent } from './admin-registration.component';
import { AuthService } from '../../../services/auth-service/auth.service';
import { FormsModule }   from '@angular/forms';

describe('AdminRegistrationComponent', () => {
  let component: AdminRegistrationComponent;
  let fixture: ComponentFixture<AdminRegistrationComponent>;

  beforeEach(async(() => {

    let authServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ AdminRegistrationComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceMock}
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegistrationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
