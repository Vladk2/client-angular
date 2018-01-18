import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParliamentAnnounceComponent } from './parliament-announce.component';

describe('ParliamentAnnounceComponent', () => {
  let component: ParliamentAnnounceComponent;
  let fixture: ComponentFixture<ParliamentAnnounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParliamentAnnounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
