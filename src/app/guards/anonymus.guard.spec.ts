import { TestBed, async, inject } from '@angular/core/testing';

import { AnonymusGuard } from './anonymus.guard';

describe('AnonymusGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonymusGuard]
    });
  });

  it('should ...', inject([AnonymusGuard], (guard: AnonymusGuard) => {
    expect(guard).toBeTruthy();
  }));
});
