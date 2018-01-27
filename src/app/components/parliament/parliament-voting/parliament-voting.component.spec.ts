import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { ParliamentVotingComponent } from './parliament-voting.component';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';

describe('ParliamentVotingComponent', () => {
  let component: ParliamentVotingComponent;
  let fixture: ComponentFixture<ParliamentVotingComponent>;

  beforeEach(async(() => {

    let parlamentServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    let alerServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ ParliamentVotingComponent ],
      providers: [
        {provide: ParliamentService, useValue: parlamentServiceMock},
        {provide: AlertService, useValue: alerServiceMock},
        Location
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentVotingComponent);
    component = fixture.componentInstance;
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
*/
});
