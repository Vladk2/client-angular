import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParliamentProposalsComponent } from './parliament-proposals.component';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';
import { FormsModule }   from '@angular/forms';

describe('ParliamentProposalsComponent', () => {
  let component: ParliamentProposalsComponent;
  let fixture: ComponentFixture<ParliamentProposalsComponent>;

  beforeEach(async(() => {

    let parliamentServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    let alertServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    TestBed.configureTestingModule({
      declarations: [ ParliamentProposalsComponent ],
      providers: [
        {provide: ParliamentService, useValue: parliamentServiceMock},
        {provide: AlertService, useValue: alertServiceMock}
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentProposalsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
