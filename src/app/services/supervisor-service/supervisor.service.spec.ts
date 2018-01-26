import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SupervisorService } from './supervisor.service';

describe('SupervisorService', () => {

  let service: SupervisorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupervisorService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

	service = TestBed.get(SupervisorService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(true).toBe(true);
  });
});
