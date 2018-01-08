import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantProblemComponent } from './tenant-problem.component';

describe('TenantProblemComponent', () => {
  let component: TenantProblemComponent;
  let fixture: ComponentFixture<TenantProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
