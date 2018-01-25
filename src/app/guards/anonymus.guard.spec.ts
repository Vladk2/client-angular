import { TestBed, async, inject } from '@angular/core/testing';

import { AnonymusGuard } from './anonymus.guard';
import { RouterModule } from '@angular/router';

describe('AnonymusGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonymusGuard],
      imports: [ RouterModule ]
    });
  });

  it('should ...', inject([AnonymusGuard], (guard: AnonymusGuard) => {
    expect(guard).toBeTruthy();
  }));
});
