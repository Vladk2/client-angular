import { TestBed, inject } from '@angular/core/testing';

import { SupervisorService } from './supervisor.service';

describe('SupervisorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupervisorService]
    });
  });

  it('should be created', inject([SupervisorService], (service: SupervisorService) => {
    expect(service).toBeTruthy();
  }));
});
