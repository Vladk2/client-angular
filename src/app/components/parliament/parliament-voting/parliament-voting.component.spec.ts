import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParliamentVotingComponent } from './parliament-voting.component';

describe('ParliamentVotingComponent', () => {
  let component: ParliamentVotingComponent;
  let fixture: ComponentFixture<ParliamentVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParliamentVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
