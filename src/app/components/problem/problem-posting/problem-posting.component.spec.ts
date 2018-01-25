import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemPostingComponent } from './problem-posting.component';

describe('ProblemPostingComponent', () => {
  let component: ProblemPostingComponent;
  let fixture: ComponentFixture<ProblemPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
