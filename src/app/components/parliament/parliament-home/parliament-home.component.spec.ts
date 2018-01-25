import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParliamentHomeComponent } from './parliament-home.component';

describe('ParliamentHomeComponent', () => {
  let component: ParliamentHomeComponent;
  let fixture: ComponentFixture<ParliamentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParliamentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
