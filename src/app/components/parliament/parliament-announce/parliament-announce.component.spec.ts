import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParliamentAnnounceComponent } from './parliament-announce.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';

describe('ParliamentAnnounceComponent', () => {
  let component: ParliamentAnnounceComponent;
  let fixture: ComponentFixture<ParliamentAnnounceComponent>;

  beforeEach(async(() => {

    let parlamentServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    let alertServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    }
    let active
    TestBed.configureTestingModule({
      declarations: [ ParliamentAnnounceComponent ],
      providers: [
        {provide: ParliamentService, useValue: parlamentServiceMock},
        {provide: AlertService, useValue: alertServiceMock},
        {provide: ActivatedRoute}
      ],
      imports: [ RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentAnnounceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
