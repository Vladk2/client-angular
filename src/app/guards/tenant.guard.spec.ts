import { TestBed, async, inject } from '@angular/core/testing';

import { TenantGuard } from './tenant.guard';
import { Router } from '@angular/router';

describe('TenantGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ {provide: Router}, TenantGuard]
    });
  });

  it('should ...', inject([TenantGuard], (guard: TenantGuard) => {
    expect(guard).toBeTruthy();
  }));

});
