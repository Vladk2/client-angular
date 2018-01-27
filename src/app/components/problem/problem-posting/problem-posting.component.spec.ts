import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { FormsModule }   from '@angular/forms';

import { ProblemPostingComponent } from './problem-posting.component';
import { ProblemService } from '../../../services/problem-service/problem.service';
import { AlertService } from '../../../services/alert-service/alert.service';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('ProblemPostingComponent', () => {
  let component: ProblemPostingComponent;
  let fixture: ComponentFixture<ProblemPostingComponent>;

  beforeEach(async(() => {

    let problemServiceMock = {
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
      declarations: [ ProblemPostingComponent ],
      providers: [
        {provide: ProblemService, useValue: problemServiceMock},
        {provide: AlertService, useValue: alertServiceMock},
        {provide: ActivatedRoute}
      ],
      imports: [ FormsModule,RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemPostingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
