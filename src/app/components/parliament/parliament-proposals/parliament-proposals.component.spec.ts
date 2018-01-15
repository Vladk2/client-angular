import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParliamentProposalsComponent } from './parliament-proposals.component';

describe('ParliamentProposalsComponent', () => {
  let component: ParliamentProposalsComponent;
  let fixture: ComponentFixture<ParliamentProposalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParliamentProposalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
