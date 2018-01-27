import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParliamentHomeComponent } from './parliament-home.component';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';
import { ActivatedRoute } from '@angular/router';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('ParliamentHomeComponent', () => {
  let component: ParliamentHomeComponent;
  let fixture: ComponentFixture<ParliamentHomeComponent>;

  beforeEach(async(() => {

    let parlamentServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ ParliamentHomeComponent ],
      providers: [
        {provide: ParliamentService, useValue: parlamentServiceMock},
        {provide: ActivatedRoute}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentHomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
