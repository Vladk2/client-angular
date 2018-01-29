import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantApprovalComponent } from './tenant-approval.component';
import {SupervisorService} from '../../../../services/supervisor-service/supervisor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('TenantApprovalComponent', () => {
  let component: TenantApprovalComponent;
  let fixture: ComponentFixture<TenantApprovalComponent>;
  let supervisorService: SupervisorService;
  let activeRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async(() => {
    const supervisorServiceMock = {
      approvateTenant: jasmine.createSpy('approvateTenant').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    TestBed.configureTestingModule({
      declarations: [ TenantApprovalComponent ],
      providers: [
        {provide: SupervisorService, useValue: supervisorServiceMock}
      ],
      imports: [FormsModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantApprovalComponent);
    component = fixture.componentInstance;
    supervisorService = TestBed.get(SupervisorService);
    activeRoute = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
