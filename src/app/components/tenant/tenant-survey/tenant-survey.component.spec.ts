import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSurveyComponent } from './tenant-survey.component';

describe('TenantSurveyComponent', () => {
  let component: TenantSurveyComponent;
  let fixture: ComponentFixture<TenantSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
