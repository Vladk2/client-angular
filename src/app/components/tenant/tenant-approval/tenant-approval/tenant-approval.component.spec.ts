import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantApprovalComponent } from './tenant-approval.component';

describe('TenantApprovalComponent', () => {
  let component: TenantApprovalComponent;
  let fixture: ComponentFixture<TenantApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
