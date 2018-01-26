import { TestBed, async, inject } from '@angular/core/testing';

import {Router} from '@angular/router';

import { AnonymusGuard } from './anonymus.guard';

describe('AnonymusGuard', () => {

  let router = {
  	navigate: jasmine.createSpy('navigate')
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      	AnonymusGuard,
      	{provide: Router, useValue: router}
      ]
    });
  });

  it('should ...', inject([AnonymusGuard], (guard: AnonymusGuard) => {
    expect(guard).toBeTruthy();
  }));
 
});
