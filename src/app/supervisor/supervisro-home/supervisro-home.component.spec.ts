import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisroHomeComponent } from './supervisro-home.component';

describe('SupervisroHomeComponent', () => {
  let component: SupervisroHomeComponent;
  let fixture: ComponentFixture<SupervisroHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisroHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisroHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
