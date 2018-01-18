import { TestBed, inject } from '@angular/core/testing';

import { ParliamentService } from './parliament.service';

describe('ParliamentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParliamentService]
    });
  });

  it('should be created', inject([ParliamentService], (service: ParliamentService) => {
    expect(service).toBeTruthy();
  }));
});
