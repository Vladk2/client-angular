import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParliamentRecordComponent } from './parliament-record.component';

describe('ParliamentRecordComponent', () => {
  let component: ParliamentRecordComponent;
  let fixture: ComponentFixture<ParliamentRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParliamentRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
