import { TestBed, async, inject } from '@angular/core/testing';

import { EmployeeGuard } from './employee.guard';
import {Router} from '@angular/router';

describe('EmployeeGuard', () => {
  let router: Router;
  beforeEach(() => {
    const routerMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      providers: [EmployeeGuard,
        {provide: Router, useValue: routerMock}
      ]
    });
    router = TestBed.get(Router);
  });

  it('should ...', inject([EmployeeGuard], (guard: EmployeeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
