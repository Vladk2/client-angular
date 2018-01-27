import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule }   from '@angular/forms';

import { ParliamentRecordComponent } from './parliament-record.component';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { AlertService } from '../../../services/alert-service/alert.service';

describe('ParliamentRecordComponent', () => {
  let component: ParliamentRecordComponent;
  let fixture: ComponentFixture<ParliamentRecordComponent>;

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
    };
    TestBed.configureTestingModule({
      declarations: [ ParliamentRecordComponent ],
      imports: [ RouterTestingModule, FormsModule ],
      providers: [
        {provide: ParliamentService, useValue: parlamentServiceMock},
        {provide: AlertService, useValue: alertServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentRecordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
